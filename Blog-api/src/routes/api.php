<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SocialController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('change-password', [AuthController::class, 'changePassWord']);
    Route::get('user-profile', [AuthController::class, 'userProfile']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get(
        'auth-google-callback',
        [SocialController::class, 'loginCallback']
    );
});

Route::post('email/verify', [AuthController::class, 'verifyEmail']);
Route::post('email/verify/pin', [AuthController::class, 'resendPin']);
Route::post(
    'forgot-password',
    [AuthController::class, 'forgotPassword']
);
Route::post(
    'reset-password',
    [AuthController::class, 'resetPassword']
);
    