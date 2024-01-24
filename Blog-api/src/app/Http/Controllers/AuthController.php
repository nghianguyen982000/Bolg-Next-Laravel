<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Http\Resources\PostCollection;
use App\Jobs\SendEmailJob;
use Illuminate\Http\Request;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\URL;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(
            ['auth:api', 'verified'],
            ['except' =>
            [
                'login',
                'resendPin',
                'verifyEmail',
                'register',
                'verify',
                'notice',
                'forgotPassword',
                'resetPassword',
                'verifyPin',
                'listPost'
            ]]
        );
    }

    /**
     * Register User
     *
     * @OA\Post(
     *      path="/api/auth/register",
     *      tags={"Auth"},
     *      operationId="register",
     *      @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *              ref="#/components/schemas/RegisterRequest"
     *         )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\MediaType(
     *              mediaType="application/json",
     *          ),
     *       ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      )
     * )
     *  @param RegisterRequest $request
     *  @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterRequest $request)
    {
        $validator = Validator::make($request->all(), $request->rules());

        if ($validator->fails()) {
            return new JsonResponse(
                $validator->errors()->toJson(),
                Response::HTTP_BAD_REQUEST
            );
        }

        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => bcrypt($request->password)]
        ));

        if ($user) {

            $verify2 =  DB::table('password_resets')->where([
                ['email', $request->all()['email']]
            ]);

            if ($verify2->exists()) {
                $verify2->delete();
            }

            $pin = rand(100000, 999999);
            DB::table('password_resets')->insert([
                'email' => $request->all()['email'],
                'token' =>  $pin

            ]);
        }
        // Mail::to($request->email)->send(new VerifyEmail($pin));
        dispatch(new SendEmailJob($pin, $request->email));
        return new JsonResponse(
            [
                'success' => true,
                'message' => 'Successful created user. Please check your email for a 6-digit pin to verify your email.',
            ],
            Response::HTTP_CREATED
        );
    }

    /**
     * Email verification.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function verifyEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [

            'token' => ['required'],
            'email' => ['required', 'string', 'email', 'max:255'],
        ]);

        if ($validator->fails()) {
            return new JsonResponse(
                [
                    'success' => false,
                    'message' => $validator->errors()
                ],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }
        $user = User::where('email', $request->email);
        $select = DB::table('password_resets')
            ->where('email', $request->email)
            ->where('token', $request->token);
        if ($select->get()->isEmpty()) {
            return new JsonResponse(
                [
                    'success' => false,
                    'message' => "Invalid token"
                ],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        $difference = Carbon::now()->diffInSeconds($select->first()->created_at);
        if ($difference > 3600) {
            return new JsonResponse(
                [
                    'success' => false,
                    'message' => "Token Expired"
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        $select = DB::table('password_resets')
            ->where('email', $request->email)
            ->where('token', $request->token)
            ->delete();

        $user->update([
            'email_verified_at' => Carbon::now()
        ]);

        return new JsonResponse(
            [
                'success' => true,
                'message' => "Email is verified"
            ],
            Response::HTTP_OK
        );
    }

    /**
     * Resend Pin.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function resendPin(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => ['required', 'string', 'email', 'max:255'],
        ]);

        if ($validator->fails()) {
            return new JsonResponse(
                [
                    'success' => false,
                    'message' => $validator->errors()
                ],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }


        $verify2 =  DB::table('password_resets')->where([
            ['email', $request->all()['email']]
        ]);

        if ($verify2->exists()) {
            $verify2->delete();
        }

        $token = random_int(100000, 999999);
        $password_reset = DB::table('password_resets')->insert([
            'email' => $request->all()['email'],
            'token' =>  $token,
            'created_at' => Carbon::now()

        ]);

        if ($password_reset) {
            // Mail::to($request->all()['email'])->send(new VerifyEmail($token));
            dispatch(new SendEmailJob($token, $request->all()['email']));
            return new JsonResponse(
                [
                    'success' => true,
                    'message' => "A verification mail has been resent"
                ],
                Response::HTTP_OK
            );
        }
    }

    /**
     * @OA\Post(
     *    path="/api/auth/login",
     *    tags={"Auth"},
     *    summary="login",
     *    operationId="login",
     *   @OA\RequestBody(
     *          description="User data",
     *          required=true,
     *          @OA\MediaType(
     *              mediaType="multipart/form-data",
     *              @OA\Schema(
     *                  @OA\Property(
     *                      property="email",
     *                      type="string",
     *                  ),
     *                  @OA\Property(
     *                      property="password",
     *                      type="string"
     *                  ),
     *              )
     *          )
     *      ),
     *    @OA\Response(
     *          response=200,
     *          description="Successful login",
     *          @OA\JsonContent(
     *              @OA\Property(property="access_token", type="string", example="eyJ0eXAiOiJKV1..."),
     *              @OA\Property(property="token_type", type="string", example="bearer"),
     *              @OA\Property(property="expires_in", type="integer", example=3600),
     *              @OA\Property(property="user", type="object",
     *                  @OA\Property(property="id", type="integer", example=13),
     *                  @OA\Property(property="name", type="string", example="Gust Stracke I"),
     *                  @OA\Property(property="email", type="string", example="freichert@schowalter.com"),
     *                  @OA\Property(property="email_verified_at", type="string", example=null),
     *                  @OA\Property(property="created_at", type="string", example=null),
     *                  @OA\Property(property="updated_at", type="string", example=null),
     *                  @OA\Property(property="primary_phone_number", type="string", example=null),
     *                  @OA\Property(property="secondary_phone_number", type="string", example=null),
     *                  @OA\Property(property="company_id", type="integer", example=1),
     *                  @OA\Property(property="role_id", type="integer", example=5),
     *                  @OA\Property(property="line_number", type="string", example=null),
     *              ),
     *          ),
     *      ),
     *    @OA\Response(
     *           response=401,
     *           description="Unauthenticated",
     *           @OA\JsonContent(
     *               @OA\Property(property="message", type="string", example="メールアドレスまたはパスワードが間違っています。")
     *           ),
     *       ),
     *     @OA\Response(
     *          response=422,
     *          description="Validation error",
     *          @OA\JsonContent(
     *              @OA\Property(property="email", type="array",
     *                  @OA\Items(type="string", example="必須項目です。")
     *              ),
     *              @OA\Property(property="password", type="array",
     *                  @OA\Items(type="string", example="必須項目です。")
     *              ),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=400,
     *          description="error",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string")
     *          ),
     *      ),
     *  )
     * /
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return new JsonResponse(
                [
                    'success' => false,
                    'message' => $validator->errors()
                ],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        if (!$token = auth()->attempt($validator->validated())) {
            return new JsonResponse(
                [
                    'success' => false,
                    'message' => 'Invalid Credentials'
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        return $this->createNewToken($token);
    }




    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        Auth::logout();

        return new JsonResponse(['message' => 'User successfully signed out'], Response::HTTP_OK);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->createNewToken(Auth::refresh());
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile()
    {

        $user = auth()->user();
        return new JsonResponse(
            [
                'success' => false,
                'user' => $user,

            ],
            Response::HTTP_OK
        );
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function listPost()
    {

        $posts = auth()->user()->posts()->paginate(5);
        return new PostCollection($posts);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token)
    {
        return new JsonResponse([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60,
            'user' => Auth::user()
        ]);
    }

    /**
     * Change PassWord.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function changePassWord(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'old_password' => 'required|string|min:6',
            'new_password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return new JsonResponse($validator->errors()->toJson(),  Response::HTTP_BAD_REQUEST);
        }
        $userId = Auth::user()->id;

        $user = User::where('id', $userId)->update(
            ['password' => bcrypt($request->new_password)]
        );

        return new JsonResponse([
            'message' => 'User successfully changed password',
            'user' => $user,
        ],  Response::HTTP_CREATED);
    }

    /**
     * Forgot password.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'string', 'email', 'max:255'],
        ]);

        if ($validator->fails()) {
            return new JsonResponse(
                [
                    'success' => false,
                    'message' => $validator->errors()
                ],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        $verify = User::where('email', $request->all()['email'])->exists();

        if ($verify) {
            $verify2 =  DB::table('password_resets')->where([
                ['email', $request->all()['email']]
            ]);

            if ($verify2->exists()) {
                $verify2->delete();
            }

            $token = Str::random(40);
            $domain = Url::to('/');
            $url = $domain . '/reset-password?token=' . $token;
            $password_reset = DB::table('password_resets')->insert([
                'email' => $request->all()['email'],
                'token' =>  $token,
                'created_at' => Carbon::now()
            ]);

            if ($password_reset) {


                // Mail::to($request->all()['email'])->send(new ResetPassword($url));
                dispatch(new SendEmailJob($url, $request->all()['email']));

                return new JsonResponse(
                    [
                        'success' => true,
                        'message' => "Please check your email to reset password",
                    ],
                    Response::HTTP_OK
                );
            }
        } else {
            return new JsonResponse(
                [
                    'success' => false,
                    'message' => "This email does not exist"
                ],
                Response::HTTP_BAD_REQUEST
            );
        }
    }


    /**
     * Reset Password.
     *
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'string', 'email', 'max:255'],
            'token' => ['required'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        if ($validator->fails()) {
            return new JsonResponse(
                [
                    'success' => false,
                    'message' => $validator->errors()
                ],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        $check = DB::table('password_resets')->where([
            ['email', $request->all()['email']],
            ['token', $request->all()['token']],
        ]);

        if ($check->exists()) {
            $difference = Carbon::now()->diffInSeconds($check->first()->created_at);
            if ($difference > 3600) {
                return new JsonResponse(
                    [
                        'success' => false,
                        'message' => "Token Expired"
                    ],
                    Response::HTTP_BAD_REQUEST
                );
            }

            $user = User::where('email', $request->email);

            $user->update([
                'password' => Hash::make($request->password)
            ]);

            DB::table('password_resets')->where([
                ['email', $request->all()['email']],
                ['token', $request->all()['token']],
            ])->delete();

            return new JsonResponse(
                [
                    'success' => true,
                    'message' => "Your password has been reset",
                ],
                Response::HTTP_OK
            );
        } else {
            return new JsonResponse(
                [
                    'success' => false,
                    'message' => "Invalid token"
                ],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }
    }
}
