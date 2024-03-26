<?php

namespace App\Http\Resources;

use App\Services\UploadServiceInterface;
use Illuminate\Http\Resources\Json\JsonResource;

class ConversationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        $uploadService = app()->make(UploadServiceInterface::class);
        return [
            'id' => $this->resource->id,
            'room_name' => $this->resource->room_name,
            'avatar' =>  !$this->resource->avatar ? null : $uploadService->getPreSigned($this->resource->avatar, 'GetObject'),
        ];
    }
}
