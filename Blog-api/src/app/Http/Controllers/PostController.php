<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostCollection;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return new PostCollection(Post::paginate(10));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'description' => 'required',
            'content' => 'required',
        ]);
        if ($validator->fails()) {
            return new JsonResponse(
                $validator->errors()->toJson(),
                Response::HTTP_BAD_REQUEST
            );
        }
        $post = Post::create(
            $validator->validated()
        );
        return new JsonResponse(
            [
                'success' => true,
                'data' => new PostResource($post)
            ],
            Response::HTTP_CREATED
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Post $post)
    {
        return new JsonResponse(
            [
                'success' => true,
                'data' => new PostResource($post)
            ],
            Response::HTTP_OK
        );
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Post $post)
    {
        $post->update($request->all());
        return new JsonResponse(
            [
                'success' => true,
                'data' => new PostResource($post)
            ],
            Response::HTTP_OK
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return new JsonResponse(
            [
                'success' => true,
            ],
            Response::HTTP_OK
        );
    }
}
