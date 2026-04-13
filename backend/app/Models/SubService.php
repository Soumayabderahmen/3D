<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SubService extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'slug',
        'title',
        'icon',
        'desc',
        'long_desc',
        'image',
        'prestations',
        'sections',
        'order',
        'active',
    ];

    protected $casts = [
        'prestations' => 'array',
        'sections'    => 'array',
        'active'      => 'boolean',
        'order'       => 'integer',
    ];

    // ── Relations ────────────────────────────────────────────────
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    // ── Scopes ──────────────────────────────────────────────────
    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }
}
