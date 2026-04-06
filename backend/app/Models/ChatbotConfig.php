<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatbotConfig extends Model
{
    protected $fillable = [
        'welcome_message',
        'system_prompt',
        'proactive_delay',
        'proactive_message',
        'suggestions',
        'max_messages',
        'enabled',
    ];

    protected $casts = [
        'suggestions'     => 'array',
        'enabled'         => 'boolean',
        'proactive_delay' => 'integer',
        'max_messages'    => 'integer',
    ];
}
