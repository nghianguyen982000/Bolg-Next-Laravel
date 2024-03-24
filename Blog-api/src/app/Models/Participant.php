<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'conversation_id',
    ];

    // Define the relationship with the user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Define the relationship with the conversation
    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }
}
