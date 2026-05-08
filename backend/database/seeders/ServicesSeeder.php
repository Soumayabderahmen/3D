<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServicesSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'slug' => 'debarras',
                'title' => 'Débarras',
                'icon' => 'Truck',
                'color_hex' => '#1B4FD8',
                'color' => 'primary-accent',
                'badge' => 'Service principal',
                'short_desc' => 'Vidage complet appartement, maison, cave, grenier, box. Devis gratuit, intervention rapide Lyon & région.',
                'long_desc' => 'Notre service de débarras prend en charge le vidage complet ou partiel de tous types de locaux.',
                'prestations' => [
                    'Vidage complet ou partiel',
                    'Tri sélectif et recyclage',
                    'Débarras succession et décès',
                    'Encombrants et gros électroménager',
                    'Nettoyage après débarras',
                    'Débarras gratuit ou indemnisé possible',
                ],
                'order' => 1,
                'active' => true,
            ],
            [
                'slug' => 'demolition',
                'title' => 'Démolition',
                'icon' => 'Hammer',
                'color_hex' => '#DC2626',
                'color' => 'destructive',
                'badge' => 'Nouveau',
                'short_desc' => 'Démolition intérieure, cloisons, faux-plafonds, carrelage. Évacuation gravats incluse.',
                'long_desc' => 'Notre service de démolition intérieure intervient pour tous vos travaux de déconstruction.',
                'prestations' => [
                    'Démolition cloisons et murs non porteurs',
                    'Dépose faux-plafonds',
                    'Retrait carrelage et parquet',
                    'Démolition cuisine et salle de bain',
                    'Évacuation gravats en benne',
                    'Nettoyage fin de chantier inclus',
                ],
                'order' => 2,
                'active' => true,
            ],
            [
                'slug' => 'desamiantage',
                'title' => 'Désamiantage',
                'icon' => 'ShieldAlert',
                'color_hex' => '#F59E0B',
                'color' => 'warning',
                'badge' => 'Certifié',
                'short_desc' => 'Retrait sécurisé de matériaux amiantés avec traçabilité complète.',
                'long_desc' => 'Notre service de désamiantage suit les protocoles de sécurité adaptés aux matériaux concernés.',
                'prestations' => [
                    'Diagnostic et repérage',
                    'Retrait sécurisé',
                    'Confinement de zone',
                    'Évacuation en centre agréé',
                    'Bordereau de suivi',
                    'Devis gratuit',
                ],
                'order' => 3,
                'active' => true,
            ],
            [
                'slug' => 'nettoyage',
                'title' => 'Nettoyage',
                'icon' => 'Sparkles',
                'color_hex' => '#10B981',
                'color' => 'secondary',
                'badge' => 'Professionnel',
                'short_desc' => 'Nettoyage professionnel : fin de chantier, bureaux, appartements, locaux industriels.',
                'long_desc' => 'Notre service de nettoyage professionnel couvre les besoins des particuliers et professionnels.',
                'prestations' => [
                    'Nettoyage fin de chantier',
                    'Nettoyage bureaux et locaux professionnels',
                    'Nettoyage appartement et maison',
                    'Nettoyage industriel',
                    'Lavage et nettoyage de vitres',
                    'Nettoyage après sinistre',
                ],
                'order' => 4,
                'active' => true,
            ],
        ];

        foreach ($services as $service) {
            Service::updateOrCreate(
                ['slug' => $service['slug']],
                $service
            );
        }
    }
}
