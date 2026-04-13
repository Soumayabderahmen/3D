<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Actualite extends Model
{
    use HasFactory;

    protected $table = 'actualites';

    protected $fillable = [
        'title',
    'service_id',
        'date',
        'location',
        'description',
        'image_before',
        'image_after',
        'published',
        'order',
    ];

    protected $casts = [
        'date'      => 'date',
        'published' => 'boolean',
        'order'     => 'integer',
    ];

    // ── Scopes ──────────────────────────────────────────────────
    public function scopePublished($query)
    {
        return $query->where('published', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderByDesc('date')->orderByDesc('created_at');
    }
    public function service()
{
    return $this->belongsTo(Service::class);
}
}
