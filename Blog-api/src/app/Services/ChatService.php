<?php

namespace App\Services;

use App\Repositories\ConversationRepository;
use App\Repositories\MessageRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;

class ChatService
{

    protected ConversationRepository $repository;
    protected MessageRepository $messageRepository;

    public function __construct(ConversationRepository $repository,  MessageRepository $messageRepository)
    {
        $this->repository = $repository;
        $this->messageRepository = $messageRepository;
    }

    public function create($data)
    {

        DB::beginTransaction();

        $conversation = $this->repository->create($data);
        if ($conversation) {
            DB::commit();
            return $conversation;
        } else {
            DB::rollBack();
            return false;
        }
    }


    public function getConversation($id)
    {
        $conversation = $this->repository->find($id);
        if (!$conversation) {
            throw new ModelNotFoundException();
        }
        return $conversation;
    }

    public function updateConversation($id, $data)
    {
        $conversation = $this->repository->update($data, $id);
        if (!$conversation) {
            return false;
        }
        return  $conversation;
    }

    public function getMessageConversation($id)
    {
        $messageConversation = $this->messageRepository->getMessageConversation($id);
        if (!$messageConversation) {
            throw new ModelNotFoundException();
        }
        return $messageConversation;
    }
}
