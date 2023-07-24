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
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('user-profile', [AuthController::class, 'userProfile']);
    Route::post('change-pass', [AuthController::class, 'changePassWord']);
    Route::get(
        'auth-google-callback',
        [SocialController::class, 'loginCallback']
    );
});
Route::get('email/verify/{id}', [AuthController::class, 'verify'])->name('verification.verify');
Route::get('email/verify', [AuthController::class, 'verify'])->name('verification.notice');
Route::get('email/resend', [AuthController::class, 'resend'])->name('verification.resend');

Route::post(
    'forgot-password',
    [AuthController::class, 'forgotPassword']
)->name('password.reset');

Route::post(
    'reset-password/{token}',
    [AuthController::class, 'resetPassword']
)->name('password.update');
