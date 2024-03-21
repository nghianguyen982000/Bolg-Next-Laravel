<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConversationRequest;
use App\Http\Resources\ConversationCollection;
use App\Http\Resources\ConversationResource;
use App\Http\Resources\MessageCollection;
use App\Http\Resources\MessageResource;
use App\Models\Conversation;
use App\Models\Message;
use App\Services\ChatService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ChatController extends Controller
{
    /**
     * @var ChatService
     */
    protected $service;


    public function __construct(ChatService $service)
    {
        $this->middleware('auth:api');
        $this->service = $service;
    }

    public function createConversations(ConversationRequest $request)
    {
        try {
            $conversation = $this->service->create($request->input());
            if ($conversation) {
                return new JsonResponse(
                    [
                        'success' => true,
                        'data' => new ConversationResource($conversation)
                    ],
                    Response::HTTP_CREATED
                );
            } else {
                return response()->json([
                    'message' => 'Create fail'
                ], 400);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    public function getInfoConversations($id)
    {
        try {
            $result = $this->service->getConversation($id);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message'  => 'Not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message'  => $e->getMessage(),
            ], 400);
        }

        return new JsonResponse(
            [
                'success' => true,
                'data' => new ConversationResource($result)
            ],
            Response::HTTP_OK
        );
    }

    public function updateConversations(ConversationRequest $request, $id)
    {
        try {
            $conversation = $this->service->updateConversation($id, $request->input());
            if ($conversation) {
                return new JsonResponse(
                    [
                        'success' => true,
                        'data' => new ConversationResource($conversation)
                    ],
                    Response::HTTP_OK
                );
            } else {
                return response()->json([
                    'message' => 'Update fail'
                ], 400);
            }
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Not found',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message'  => $e->getMessage(),
            ], 400);
        }
    }


    public function getMessageConversations($id)
    {
        try {
            $result = $this->service->getMessageConversation($id);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message'  => 'Not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message'  => $e->getMessage(),
            ], 400);
        }

        return new JsonResponse(
            [
                'success' => true,
                'data' => new MessageResource($result)
            ],
            Response::HTTP_OK
        );
    }
}
