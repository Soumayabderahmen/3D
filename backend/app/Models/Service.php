<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'icon',
        'color_hex',
        'color',
        'badge',
        'short_desc',
        'long_desc',
        'prestations',
        'order',
        'active',
    ];

    protected $casts = [
        'prestations' => 'array',
        'active'      => 'boolean',
        'order'       => 'integer',
    ];

    // ── Relations ────────────────────────────────────────────────
    public function subServices(): HasMany
    {
        return $this->hasMany(SubService::class)->orderBy('order');
    }

    public function activeSubServices(): HasMany
    {
        return $this->hasMany(SubService::class)
            ->where('active', true)
            ->orderBy('order');
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
