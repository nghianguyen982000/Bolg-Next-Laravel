<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;
    protected $fillable = [
        'room_name',
        'avatar'
    ];

    // Define the relationship with the participants
    public function participants()
    {
        return $this->hasMany(Participant::class);
    }

    // Define the relationship with the messages
    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
