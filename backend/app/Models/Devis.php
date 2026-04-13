<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Devis extends Model
{
    use HasFactory;

    protected $table = 'devis';

    protected $fillable = [
        'service',
        'place',
        'volume',
        'departement',
        'date_souhaitee',
        'urgent',
        'prenom',
        'nom',
        'tel',
        'email',
        'message',
        'statut',
    ];

    protected $casts = [
        'urgent'        => 'boolean',
        'date_souhaitee' => 'date',
    ];

    // Labels lisibles pour les enums
    public function getServiceLabelAttribute(): string
    {
        return match($this->service) {
            'debarras'     => 'Débarras',
            'demolition'   => 'Démolition',
            'desamiantage' => 'Désamiantage',
            'nettoyage'    => 'Nettoyage',
            default        => ucfirst($this->service),
        };
    }

    public function getPlaceLabelAttribute(): string
    {
        return match($this->place) {
            'appartement' => 'Appartement',
            'maison'      => 'Maison',
            'cave'        => 'Cave / Grenier',
            'bureau'      => 'Bureau',
            'autre'       => 'Autre',
            default       => ucfirst($this->place),
        };
    }

    public function getStatutLabelAttribute(): string
    {
        return match($this->statut) {
            'nouveau'   => 'Nouveau',
            'en_cours'  => 'En cours',
            'traite'    => 'Traité',
            'annule'    => 'Annulé',
            default     => ucfirst($this->statut),
        };
    }

    public function scopeNouveau($query)
    {
        return $query->where('statut', 'nouveau');
    }
}
