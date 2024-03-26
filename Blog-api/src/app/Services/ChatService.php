<?php

namespace App\Services;

use App\Jobs\ChatJob;
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

    public function createConversation($data)
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

    public function getConversations()
    {
        $conversation = $this->repository->all();
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

    public function deleteConversation($id)
    {
        $conversation = $this->repository->delete($id);
        if (!$conversation) {
            return false;
        }
        return  true;
    }

    public function getMessageConversation($id)
    {
        $messageConversation = $this->messageRepository->getMessageConversation($id);
        if (!$messageConversation) {
            throw new ModelNotFoundException();
        }
        return $messageConversation;
    }

    public function createMessageConversation($id, $data)
    {

        DB::beginTransaction();

        $data['conversation_id'] = $id;
        $data['user_id'] = auth()->id();
        $message = $this->messageRepository->create($data);
        if ($message) {
            event(new ChatJob(($message)));
            DB::commit();
            return $message;
        } else {
            DB::rollBack();
            return false;
        }
    }

    public function getMessage($id)
    {
        $message = $this->messageRepository->find($id);
        if (!$message) {
            throw new ModelNotFoundException();
        }
        return $message;
    }

    public function updateMessage($id, $data)
    {
        $message = $this->messageRepository->update($data, $id);
        if (!$message) {
            return false;
        }
        return  $message;
    }

    public function deleteMessage($id)
    {
        $message = $this->messageRepository->delete($id);
        if (!$message) {
            return false;
        }
        return  true;
    }
}
