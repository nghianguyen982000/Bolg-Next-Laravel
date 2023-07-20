<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialController extends Controller
{

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['callback']]);
    }


    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {

        $getInfo = Socialite::driver('google')->user();

        $user = $this->createUser($getInfo, 'google');

        Auth::login($user);

        return response()->json([
            'message' => 'successfully',
            'user' => $user,
        ], 201);
    }
    function createUser($getInfo, $provider)
    {

        $user = User::where('provider_id', $getInfo->id)->first();

        if (!$user) {
            $user = User::create([
                'name'     => $getInfo->name,
                'email'    => $getInfo->email,
                'provider' => $provider,
                'provider_id' => $getInfo->id
            ]);
        }
        return $user;
    }
}
