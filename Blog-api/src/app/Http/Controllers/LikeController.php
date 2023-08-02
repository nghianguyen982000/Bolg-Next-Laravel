<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class LikeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function store($id)
    {
        $like = Like::where('user_id', auth()->user()->id)->where('post_id', $id)->first();
        if ($like) {
            return new JsonResponse(
                [
                    'success' => false,
                    'message' => 'The post has been liked'
                ],
                Response::HTTP_BAD_REQUEST
            );
        }
        Like::create([
            'user_id' => auth()->user()->id,
            'post_id' => $id,
        ]);

        return new JsonResponse(
            [
                'success' => true,
                'message' => 'Successfully liked the post'
            ],
            Response::HTTP_OK
        );
    }

    public function destroy($id)
    {
        $like = Like::where('user_id', auth()->user()->id)->where('post_id', $id)->first();

        if ($like) {
            $like->delete();
            return new JsonResponse(
                [
                    'success' => true,
                    'message' => 'Successfully unliked the post'
                ],
                Response::HTTP_OK
            );
        } else {
            return new JsonResponse(
                [
                    'success' => false,
                    'message' => 'No like found for this post and user'
                ],
                Response::HTTP_BAD_REQUEST
            );
        }
    }
}
