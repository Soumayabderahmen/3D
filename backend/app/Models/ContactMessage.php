<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    use HasFactory;

    protected $table = 'contact_messages';

    protected $fillable = [
        'prenom',
        'nom',
        'tel',
        'email',
        'sujet',
        'message',
        'statut',
        'lu_at',
    ];

    protected $casts = [
        'lu_at' => 'datetime',
    ];

    /**
     * Scope pour les messages non lus
     */
    public function scopeNouveau($query)
    {
        return $query->where('statut', 'nouveau');
    }

    /**
     * Marquer comme lu
     */
    public function marquerCommentLu(): void
    {
        $this->update([
            'statut' => 'lu',
            'lu_at' => now(),
        ]);
    }
}
