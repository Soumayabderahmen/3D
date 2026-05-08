<?php
// app/Models/Zone.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Zone extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'slug',
        'nom',
        'num',
        'dep',
        'dist_km',
        'quartiers',
        'active',
    ];
protected $hidden = ['pivot'];
    protected $casts = [
        'quartiers' => 'array',
        'active'    => 'boolean',
        'num'       => 'integer',
        'dist_km'   => 'integer',
    ];

    // ── Relations ────────────────────────────────────────────────
    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'service_zone')
                    ->withTimestamps();
    }

    // ── Scopes ───────────────────────────────────────────────────

    public function scopeArrondissements($query)
    {
        return $query->where('type', 'arrondissement');
    }

    public function scopeVilles($query)
    {
        return $query->where('type', 'ville');
    }

 public function scopeActive($query)
{
    return $query->where('zones.active', true); // ← préfixer avec zones.
}

public function scopeOrdered($query)
{
    return $query->orderBy('zones.dist_km')->orderBy('zones.num'); // ← préfixer
}
    // ── Helpers ──────────────────────────────────────────────────
    public function isArrondissement(): bool
    {
        return $this->type === 'arrondissement';
    }

    public function isVille(): bool
    {
        return $this->type === 'ville';
    }

    public function getLabelAttribute(): string
    {
        return $this->isArrondissement()
            ? "Lyon {$this->num}e"
            : $this->nom;
    }
}
