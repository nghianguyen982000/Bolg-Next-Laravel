<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\EmailVerifyRequest;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\ResendPinRequest;
use App\Http\Requests\ResetPasswordRequest;
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
     *    @OA\Response(
     *          response=200,
     *          description="Register successfully",
     *          @OA\JsonContent(
     *              @OA\Property(property="success", type="boolean", example="true"),
     *              @OA\Property(property="message", type="string", example="Successful created user. Please check your email for a 6-digit pin to verify your email."),
     *          ),
     *      ),
     *     @OA\Response(
     *          response=422,
     *          description="Validation error",
     *            @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="The email has already been taken"),
     *              @OA\Property(
     *                  property="errors",
     *                  type="object"
     *              ),
     *          ),
     *      ),
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
     *   @OA\Post(
     *      path="/api/auth/email/verify",
     *      tags={"Auth"},
     *      operationId="email-verify",
     *      @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *              ref="#/components/schemas/EmailVerifyRequest"
     *         )
     *      ),
     *    @OA\Response(
     *          response=200,
     *          description="Verify email successfully",
     *          @OA\JsonContent(
     *              @OA\Property(property="success", type="boolean", example="true"),
     *              @OA\Property(property="message", type="string", example="Email is verified."),
     *          ),
     *      ),
     *     @OA\Response(
     *          response=422,
     *          description="Verify email error",
     *          @OA\JsonContent(
     *              @OA\Property(property="success", type="boolean", example="false"),
     *              @OA\Property(property="message", type="string", example="Invalid token."),
     *          ),
     *      ),
     * )
     * @param EmailVerifyRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function verifyEmail(EmailVerifyRequest $request)
    {
        $validator = Validator::make($request->all(),  $request->rules());

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
     *   @OA\Post(
     *      path="/api/auth/email/verify/pin",
     *      tags={"Auth"},
     *      operationId="resend-pin",
     *      @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *              ref="#/components/schemas/ResendPinRequest"
     *         )
     *      ),
     *    @OA\Response(
     *          response=200,
     *          description="Resend pin  successfully",
     *          @OA\JsonContent(
     *              @OA\Property(property="success", type="boolean", example="true"),
     *              @OA\Property(property="message", type="string", example="A verification mail has been resent."),
     *          ),
     *      ),
     *     @OA\Response(
     *          response=422,
     *          description="Resend pin  error",
     *          @OA\JsonContent(
     *              @OA\Property(property="success", type="boolean", example="false"),
     *              @OA\Property(property="message", type="string", example="Email is not registered."),
     *          ),
     *      ),
     * )
     * @param ResendPinRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function resendPin(ResendPinRequest $request)
    {

        $validator = Validator::make($request->all(),  $request->rules());

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
            ['email', $request->input('email')]
        ]);


        if (!$verify2->exists()) {
            return new JsonResponse(
                [
                    'success' => false,
                    'message' => "Email is not registered"
                ],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }
        $verify2->delete();

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
     * Login
     *
     * @OA\Post(
     *    path="/api/auth/login",
     *    tags={"Auth"},
     *    operationId="Login",
     *      @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *              ref="#/components/schemas/LoginRequest"
     *         )
     *      ),
     *    @OA\Response(
     *          response=200,
     *          description="Login  successfully",
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
     *                  @OA\Property(property="updated_at", type="string", example=null)
     *              ),
     *          ),
     *      ),
     *     @OA\Response(
     *          response=422,
     *          description="Resend pin  error",
     *          @OA\JsonContent(
     *              @OA\Property(property="success", type="boolean", example="false"),
     *              @OA\Property(property="message", type="string", example="Invalid Credentials"),
     *          ),
     *      ),
     * )
     * @param LoginRequest $request
     * @return \Illuminate\Http\JsonResponse
     *
     */
    public function login(LoginRequest $request)
    {
        $validator = Validator::make($request->all(), $request->rules());

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
     * @OA\Post(
     *    path="/api/auth/logout",
     *    tags={"Auth"},
     *    security={{"AdminBearerAuth":{}}},
     *    operationId="logout",
     *    @OA\Response(
     *          response=200,
     *          description="User successfully signed out",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="User successfully signed out"),
     *          ),
     *      ),
     *     @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Unauthenticated.")
     *          ),
     *      ),
     * )
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
     * @OA\Post(
     *    path="/api/auth/refresh",
     *    tags={"Auth"},
     *    security={{"AdminBearerAuth":{}}},
     *    operationId="refresh",
     *    @OA\Response(
     *          response=200,
     *          description="Refresh successfully",
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
     *                  @OA\Property(property="updated_at", type="string", example=null)
     *              ),
     *          ),
     *      ),
     *     @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Unauthenticated.")
     *          ),
     *      ),
     * )
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
     * @OA\Post(
     *    path="/api/auth/use-profile",
     *    tags={"Auth"},
     *    security={{"AdminBearerAuth":{}}},
     *    operationId="use-profile",
     *    @OA\Response(
     *          response=200,
     *          description="Profile",
     *          @OA\JsonContent(
     *              @OA\Property(property="user", type="object",
     *                  @OA\Property(property="id", type="integer", example=13),
     *                  @OA\Property(property="name", type="string", example="Gust Stracke I"),
     *                  @OA\Property(property="email", type="string", example="freichert@schowalter.com"),
     *                  @OA\Property(property="email_verified_at", type="string", example=null),
     *                  @OA\Property(property="created_at", type="string", example=null),
     *                  @OA\Property(property="updated_at", type="string", example=null)
     *              ),
     *          ),
     *      ),
     *     @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Unauthenticated.")
     *          ),
     *      ),
     * )
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile()
    {

        $user = auth()->user();
        return new JsonResponse(
            [
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
     *  @OA\Post(
     *    path="/api/auth/change-password",
     *    tags={"Auth"},
     *    security={{"AdminBearerAuth":{}}},
     *    operationId="change-password",
     *    @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *              ref="#/components/schemas/ChangePasswordRequest"
     *         )
     *      ),
     *    @OA\Response(
     *          response=200,
     *          description="User successfully changed password",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="User successfully changed password"),
     *          ),
     *      ),
     *     @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Unauthenticated.")
     *          ),
     *      ),
     * )
     * @param ChangePasswordRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function changePassWord(ChangePasswordRequest $request)
    {
        $validator = Validator::make($request->all(), $request->rules());

        if ($validator->fails()) {
            return new JsonResponse($validator->errors()->toJson(),  Response::HTTP_BAD_REQUEST);
        }

        $user = Auth::user();

        if (password_verify($request->input('old_password'), $user->password)) {
            $user = User::where('id', $user->id)->update(
                ['password' => bcrypt($request->new_password)]
            );

            return new JsonResponse([
                'message' => 'User successfully changed password',
            ],  Response::HTTP_CREATED);
        } else {
            return new JsonResponse(['message' => 'Current password is incorrect'],  Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Forgot password.
     *
     *  @OA\Post(
     *    path="/api/auth/forgot-password",
     *    tags={"Auth"},
     *    security={{"AdminBearerAuth":{}}},
     *    operationId="forgot-password",
     *    @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *              ref="#/components/schemas/ForgotPasswordRequest"
     *         )
     *      ),
     *    @OA\Response(
     *          response=200,
     *          description="Please check your email to reset password",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Please check your email to reset password"),
     *          ),
     *      ),
     *     @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Unauthenticated.")
     *          ),
     *      ),
     * )
     * @param ForgotPasswordRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function forgotPassword(ForgotPasswordRequest $request)
    {
        $validator = Validator::make($request->all(), $request->rules());

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
     *  @OA\Post(
     *    path="/api/auth/reset-password",
     *    tags={"Auth"},
     *    security={{"AdminBearerAuth":{}}},
     *    operationId="reset-password",
     *    @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *              ref="#/components/schemas/ForgotPasswordRequest"
     *         )
     *      ),
     *    @OA\Response(
     *          response=200,
     *          description="Your password has been reset",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Your password has been reset"),
     *          ),
     *      ),
     *     @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Unauthenticated.")
     *          ),
     *      ),
     * )
     * @param ResetPasswordRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function resetPassword(ResetPasswordRequest $request)
    {
        $validator = Validator::make($request->all(), $request->rules());

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
