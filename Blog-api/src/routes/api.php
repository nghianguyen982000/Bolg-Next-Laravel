<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\S3Controller;
use App\Http\Controllers\SocialController;
use App\Http\Controllers\ChatController;

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
    Route::get('user/posts', [AuthController::class, 'listPost']);
    Route::middleware('verify.api')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
    });
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get(
        'auth-google-callback',
        [SocialController::class, 'loginCallback']
    );
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
});

Route::group([
    'prefix' => 'post'
], function () {
    Route::get('', [PostController::class, 'index']);
    Route::get('/{post}', [PostController::class, 'show']);
    Route::post('', [PostController::class, 'store']);
    Route::put('/{post}', [PostController::class, 'update']);
    Route::delete('/{post}', [PostController::class, 'destroy']);
    Route::post('/{id}/like', [LikeController::class, 'store']);
    Route::delete('/{id}/unlike', [LikeController::class, 'destroy']);
    Route::get('/{id}/comments', [CommentController::class, 'index']);
    Route::post('/{id}/comment', [CommentController::class, 'store']);
    Route::put('/{id}/comment', [CommentController::class, 'update']);
    Route::delete('/{id}/comment', [CommentController::class, 'destroy']);
});

Route::group([
    'prefix' => 'chat'
], function () {
    Route::get('', [ChatController::class, 'index']);
    Route::post('/conversations', [ChatController::class, 'createConversation']);
    Route::get('/conversations', [ChatController::class, 'getConversations']);
    Route::get('/conversations/{id}', [ChatController::class, 'getInfoConversation']);
    Route::put('/conversations/{id}', [ChatController::class, 'updateConversation']);
    Route::delete('/conversations/{id}', [ChatController::class, 'deleteConversation']);
    Route::get('/conversations/{id}/messages', [ChatController::class, 'getMessageConversation']);
    Route::post('/conversations/{id}/messages', [ChatController::class, 'createMessageConversation']);
    Route::get('/message/{id}', [ChatController::class, 'getMessage']);
    Route::put('/message/{id}', [ChatController::class, 'updateMessage']);
    Route::delete('/message/{id}', [ChatController::class, 'deleteMessage']);
});

Route::group([
    'prefix' => 'upload'
], function () {
    Route::get('get_pre_signed', [S3Controller::class, 'createGetObjectPresignedURL']);
    Route::get('pre_signed', [S3Controller::class, 'createPutObjectPreSignedURL']);
    Route::delete('delete_file', [S3Controller::class, 'deleteFile']);
});
