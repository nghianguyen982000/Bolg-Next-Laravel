<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConversationRequest;
use App\Http\Requests\MessageRequest;
use App\Http\Resources\ConversationCollection;
use App\Http\Resources\ConversationResource;
use App\Http\Resources\MessageCollection;
use App\Http\Resources\MessageResource;
use App\Services\ChatService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
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

    public function createConversation(ConversationRequest $request)
    {
        try {
            $conversation = $this->service->createConversation($request->input());
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

    /**
     * @OA\Get(
     *     path="/api/chat/conversations/{id}",
     *     summary="Get detail conversation",
     *     tags={"Chat"},
     *     security={{"AdminBearerAuth":{}}},
     *     operationId="getInfoConversation",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID conversation",
     *         required=true,
     *         @OA\Schema(type="integer", format="int64"),
     *     ),
     *     @OA\Response(
     *          response=200,
     *          description="Successfully",
     *          @OA\JsonContent(
     *              @OA\Property(property="success", type="boolean", example="true"),
     *              @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="room_name", type="string"),
     *                 @OA\Property(property="avatar", type="string"),
     *             ),
     *          ),
     *       ),
     * )
     */

    public function getInfoConversation($id)
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


    /**
     * Get all Room
     *
     * @OA\Get(
     *      path="/api/chat/conversations",
     *      tags={"Chat"},
     *      operationId="getConversations",
     *      security={{"AdminBearerAuth":{}}},
     *      @OA\Response(
     *          response=200,
     *          description="Successfully",
     *          @OA\JsonContent(
     *              @OA\Property(property="success", type="boolean", example="true"),
     *              @OA\Property(property="data", type="array", @OA\Items(
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="room_name", type="string"),
     *                 @OA\Property(property="avatar", type="string"),
     *             )),
     *          ),
     *       ),
     * )
     */

    public function getConversations()
    {
        try {
            $result = $this->service->getConversations();
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
                'data' => new ConversationCollection($result)
            ],
            Response::HTTP_OK
        );
    }

    public function updateConversation(ConversationRequest $request, $id)
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

    public function deleteConversation($id)
    {
        try {
            $result = $this->service->deleteConversation($id);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Not found',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message'  => $e->getMessage(),
            ], 400);
        }

        if (!$result) {
            return response()->json([
                'message' => 'Delete fail',
            ], 400);
        }
        return new JsonResponse(
            [
                'success' => true,
                'data' => "Delete succes"
            ],
            Response::HTTP_NO_CONTENT
        );
    }


    /**
     * @OA\Get(
     *     path="/api/chat/conversations/{id}/messages",
     *     summary="Get message conversation",
     *     tags={"Chat"},
     *     security={{"AdminBearerAuth":{}}},
     *     operationId="getMessageConversation",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID conversation",
     *         required=true,
     *         @OA\Schema(type="integer", format="int64"),
     *     ),
     *     @OA\Response(
     *          response=200,
     *          description="Successfully",
     *          @OA\JsonContent(
     *              @OA\Property(property="success", type="boolean", example="true"),
     *              @OA\Property(property="data", type="array", @OA\Items(
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="message", type="string"),
     *                 @OA\Property(property="messageType", type="integer"),
     *                 @OA\Property(property="createdAt", type="string"),
     *                 @OA\Property(property="userName", type="string"),
     *             )),
     *          ),
     *       ),
     * )
     */

    public function getMessageConversation($id)
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
                'data' => new MessageCollection($result)
            ],
            Response::HTTP_OK
        );
    }


    /**
     *
     *   @OA\Post(
     *      path="/api/chat/conversations/{id}/messages",
     *      summary="Create message conversation",
     *      tags={"Chat"},
     *      security={{"AdminBearerAuth":{}}},
     *      operationId="createConversation",
     *      @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID conversation",
     *         required=true,
     *         @OA\Schema(type="integer", format="int64"),
     *      ),
     *      @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *              ref="#/components/schemas/MessageRequest"
     *         )
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Successfully",
     *          @OA\JsonContent(
     *              @OA\Property(property="success", type="boolean", example="true"),
     *              @OA\Property(property="data", type="array", @OA\Items(
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="content", type="string"),
     *                 @OA\Property(property="messageType", type="integer"),
     *                 @OA\Property(property="createdAt", type="string"),
     *                 @OA\Property(property="userName", type="string"),
     *             )),
     *          ),
     *       ),
     * )
     */


    public function createMessageConversation($id, MessageRequest $request)
    {
        try {
            $message = $this->service->createMessageConversation($id, $request->input());
            if ($message) {
                return new JsonResponse(
                    [
                        'success' => true,
                        'data' => new MessageResource($message)
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

    public function getMessage($id)
    {
        try {
            $result = $this->service->getMessage($id);
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

    public function updateMessage(MessageRequest $request, $id)
    {
        try {
            $message = $this->service->updateMessage($id, $request->input());
            if ($message) {
                return new JsonResponse(
                    [
                        'success' => true,
                        'data' => new MessageResource($message)
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

    public function deleteMessage($id)
    {
        try {
            $result = $this->service->deleteMessage($id);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Not found',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message'  => $e->getMessage(),
            ], 400);
        }

        if (!$result) {
            return response()->json([
                'message' => 'Delete fail',
            ], 400);
        }
        return new JsonResponse(
            [
                'success' => true,
                'data' => "Delete succes"
            ],
            Response::HTTP_NO_CONTENT
        );
    }
}
