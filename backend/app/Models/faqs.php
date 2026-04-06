<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class faqs extends Model
{
    protected $fillable = [
        'question',
        'answer',
        'active',
        'order',
    ];

    protected $casts = [
        'active' => 'boolean',
        'order'  => 'integer',
    ];

    // Scope : uniquement les FAQs actives
    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    // Scope : triées par ordre
    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }
}
