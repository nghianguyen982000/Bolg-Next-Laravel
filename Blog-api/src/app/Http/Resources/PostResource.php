<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->resource->id,
            'title' => $this->resource->title,
            'description' => $this->resource->description,
            'content' => $this->resource->content,
            'published' => $this->resource->published,
            'deleted' => $this->resource->deleted,
            'created_at' => $this->resource->created_at,
            'updated_at' => $this->resource->updated_at,
            'comments' => new CommentCollection($this->resource->comments),
        ];
    }
}
