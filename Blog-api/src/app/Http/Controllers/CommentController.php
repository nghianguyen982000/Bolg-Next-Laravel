<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentCollection;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function index($id)
    {
        $comments = Post::find($id)->comments()->paginate(5);

        return new CommentCollection($comments);
    }
    public function store(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'comment' => 'required'
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
        $comment = Comment::create([
            'user_id' => auth()->user()->id,
            'post_id' => $id,
            'comment' => $request->comment,
        ]);


        return new JsonResponse(
            [
                'success' => true,
                'message' => 'Comment on a successful post'
            ],
            Response::HTTP_UNPROCESSABLE_ENTITY
        );
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'comment' => 'required'

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
        $comment = Comment::where('user_id', auth()->user()->id)->where('id', $id)->first();
        if ($comment) {
            $comment->update([
                'comment' => $request->comment,
            ]);
            return new JsonResponse(
                [
                    'success' => true,
                    'message' => 'Comment updated successfully'
                ],
                Response::HTTP_OK
            );
        } else {
            return new JsonResponse(
                [
                    'success' => false,
                    'message' => 'No comment found for this user and id'
                ],
                Response::HTTP_BAD_REQUEST
            );
        }
    }
    public function destroy($id)
    {
        $comment = Comment::where('user_id', auth()->user()->id)->where('id', $id)->first();

        if ($comment) {
            $comment->delete();
            return new JsonResponse(
                [
                    'success' => true,
                    'message' => 'Comment deleted successfully.'
                ],
                Response::HTTP_OK
            );
        } else {
            return new JsonResponse(
                [
                    'success' => false,
                    'message' => 'No comment found for this user and id.'
                ],
                Response::HTTP_BAD_REQUEST
            );
        }
    }
}
