<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ZoneSeeder extends Seeder
{
    // Données extraites directement depuis services.ts
    private array $arrondissements = [
        ['num' => 1, 'nom' => "Presqu'île / Terreaux",     'quartiers' => ["Les Terreaux", "Place des Jacobins", "Hôtel de Ville"]],
        ['num' => 2, 'nom' => "Confluent / Bellecour",     'quartiers' => ["Bellecour", "Ainay", "Confluence", "Perrache"]],
        ['num' => 3, 'nom' => "Part-Dieu / Préfecture",    'quartiers' => ["Part-Dieu", "Préfecture", "Saxe-Gambetta", "Montchat"]],
        ['num' => 4, 'nom' => "Croix-Rousse",              'quartiers' => ["Croix-Rousse", "Plateau", "Pentes"]],
        ['num' => 5, 'nom' => "Vieux Lyon / Point du Jour",'quartiers' => ["Vieux Lyon", "Saint-Jean", "Fourvière", "Point du Jour"]],
        ['num' => 6, 'nom' => "Brotteaux / Tête d'Or",    'quartiers' => ["Les Brotteaux", "Parc de la Tête d'Or", "Foch"]],
        ['num' => 7, 'nom' => "Guillotière / Jean Macé",   'quartiers' => ["Guillotière", "Jean Macé", "Gerland"]],
        ['num' => 8, 'nom' => "États-Unis / Mermoz",       'quartiers' => ["États-Unis", "Mermoz", "Monplaisir", "Le Bachut"]],
        ['num' => 9, 'nom' => "Vaise / Duchère",           'quartiers' => ["Vaise", "La Duchère", "Saint-Rambert", "Gorge de Loup"]],
    ];

    private array $villes = [
        ['slug' => 'lyon',              'nom' => 'Lyon',                'dep' => '69', 'dist' => 0,   'quartiers' => ["Presqu'île", "Vieux Lyon", "Part-Dieu"]],
        ['slug' => 'villeurbanne',      'nom' => 'Villeurbanne',        'dep' => '69', 'dist' => 5,   'quartiers' => ["Gratte-Ciel", "Tonkin"]],
        ['slug' => 'venissieux',        'nom' => 'Vénissieux',          'dep' => '69', 'dist' => 10,  'quartiers' => ["Centre", "Minguettes"]],
        ['slug' => 'bron',              'nom' => 'Bron',                'dep' => '69', 'dist' => 8,   'quartiers' => ["Centre", "Parilly"]],
        ['slug' => 'caluire',           'nom' => 'Caluire-et-Cuire',   'dep' => '69', 'dist' => 8,   'quartiers' => ["Centre", "Bissardon"]],
        ['slug' => 'saint-priest',      'nom' => 'Saint-Priest',        'dep' => '69', 'dist' => 15,  'quartiers' => ["Centre", "Manissieux"]],
        ['slug' => 'meyzieu',           'nom' => 'Meyzieu',             'dep' => '69', 'dist' => 18,  'quartiers' => ["Centre", "Les Plantées"]],
        ['slug' => 'decines',           'nom' => 'Décines-Charpieu',    'dep' => '69', 'dist' => 15,  'quartiers' => ["Centre", "Charpieu"]],
        ['slug' => 'tassin',            'nom' => 'Tassin-la-Demi-Lune','dep' => '69', 'dist' => 8,   'quartiers' => ["Centre", "Alaï"]],
        ['slug' => 'grenoble',          'nom' => 'Grenoble',            'dep' => '38', 'dist' => 104, 'quartiers' => ["Centre-ville", "Bastille", "Europole"]],
        ['slug' => 'saint-etienne',     'nom' => 'Saint-Étienne',       'dep' => '42', 'dist' => 60,  'quartiers' => ["Centre-ville", "Châteaucreux"]],
        ['slug' => 'valence',           'nom' => 'Valence',             'dep' => '26', 'dist' => 100, 'quartiers' => ["Centre-ville", "Victor Hugo"]],
        ['slug' => 'chambery',          'nom' => 'Chambéry',            'dep' => '73', 'dist' => 100, 'quartiers' => ["Centre-ville", "Le Biollay"]],
        ['slug' => 'annecy',            'nom' => 'Annecy',              'dep' => '74', 'dist' => 140, 'quartiers' => ["Vieille Ville", "Les Marquisats"]],
        ['slug' => 'bourg-en-bresse',   'nom' => 'Bourg-en-Bresse',    'dep' => '01', 'dist' => 65,  'quartiers' => ["Centre", "Brou"]],
        ['slug' => 'macon',             'nom' => 'Mâcon',               'dep' => '71', 'dist' => 70,  'quartiers' => ["Centre-ville", "Flacé"]],
        ['slug' => 'roanne',            'nom' => 'Roanne',              'dep' => '42', 'dist' => 90,  'quartiers' => ["Centre", "Le Coteau"]],
        ['slug' => 'vienne',            'nom' => 'Vienne',              'dep' => '38', 'dist' => 32,  'quartiers' => ["Centre-ville", "Estressin"]],
        ['slug' => 'bourgoin-jallieu',  'nom' => 'Bourgoin-Jallieu',   'dep' => '38', 'dist' => 45,  'quartiers' => ["Centre", "Jallieu"]],
        ['slug' => 'romans',            'nom' => 'Romans-sur-Isère',    'dep' => '26', 'dist' => 80,  'quartiers' => ["Centre-ville", "Quartier historique"]],
        ['slug' => 'clermont-ferrand',  'nom' => 'Clermont-Ferrand',   'dep' => '63', 'dist' => 165, 'quartiers' => ["Centre-ville", "Jaude"]],
        ['slug' => 'dijon',             'nom' => 'Dijon',               'dep' => '21', 'dist' => 190, 'quartiers' => ["Centre-ville", "Toison d'Or"]],
        ['slug' => 'montlucon',         'nom' => 'Montluçon',           'dep' => '03', 'dist' => 195, 'quartiers' => ["Centre-ville", "Ville Gozet"]],
        ['slug' => 'aubenas',           'nom' => 'Aubenas',             'dep' => '07', 'dist' => 140, 'quartiers' => ["Centre-ville", "Quartier du Château"]],
        ['slug' => 'montelimar',        'nom' => 'Montélimar',          'dep' => '26', 'dist' => 145, 'quartiers' => ["Centre-ville", "Les Alexis"]],
    ];

    private array $servicesSlugs = ['debarras', 'demolition', 'desamiantage', 'nettoyage'];

    public function run(): void
    {
        // Récupérer les IDs des services par slug
        $services = DB::table('services')
            ->whereIn('slug', $this->servicesSlugs)
            ->pluck('id', 'slug'); // ['debarras' => 1, 'demolition' => 2, ...]

        if ($services->isEmpty()) {
            $this->command->warn('⚠️  Aucun service trouvé. Lance d\'abord ServiceSeeder.');
            return;
        }

        $now = now();

        // ── 1. Arrondissements Lyon ──────────────────────────────
        $arrondissementsRows = [];

        foreach ($this->arrondissements as $arr) {
            $arrondissementsRows[] = [
                'type'      => 'arrondissement',
                'slug'      => "lyon-{$arr['num']}",
                'nom'       => "Lyon {$arr['num']}e — {$arr['nom']}",
                'num'       => $arr['num'],
                'dep'       => '69',
                'dist_km'   => 0,
                'quartiers' => json_encode($arr['quartiers']),
                'active'    => true,
                'created_at'=> $now,
                'updated_at'=> $now,
            ];
        }

        // ── 2. Villes ────────────────────────────────────────────
        $villesRows = [];

        foreach ($this->villes as $v) {
            $villesRows[] = [
                'type'      => 'ville',
                'slug'      => $v['slug'],
                'nom'       => $v['nom'],
                'num'       => null,
                'dep'       => $v['dep'],
                'dist_km'   => $v['dist'],
                'quartiers' => json_encode($v['quartiers']),
                'active'    => true,
                'created_at'=> $now,
                'updated_at'=> $now,
            ];
        }

        // Insérer zones (upsert pour éviter les doublons si relancé)
        DB::table('zones')->upsert(
            array_merge($arrondissementsRows, $villesRows),
            ['slug'],
            ['nom', 'num', 'dep', 'dist_km', 'quartiers', 'active', 'updated_at']
        );

        // ── 3. Pivot service_zone ────────────────────────────────
        $zoneIds = DB::table('zones')->pluck('id', 'slug');
        $pivotRows = [];

        foreach ($services as $serviceSlug => $serviceId) {
            // Tous les arrondissements
            foreach ($this->arrondissements as $arr) {
                $zoneSlug = "lyon-{$arr['num']}";
                if (isset($zoneIds[$zoneSlug])) {
                    $pivotRows[] = [
                        'service_id' => $serviceId,
                        'zone_id'    => $zoneIds[$zoneSlug],
                        'created_at' => $now,
                        'updated_at' => $now,
                    ];
                }
            }

            // Toutes les villes
            foreach ($this->villes as $v) {
                if (isset($zoneIds[$v['slug']])) {
                    $pivotRows[] = [
                        'service_id' => $serviceId,
                        'zone_id'    => $zoneIds[$v['slug']],
                        'created_at' => $now,
                        'updated_at' => $now,
                    ];
                }
            }
        }

        // Upsert pivot pour éviter les doublons
        DB::table('service_zone')->upsert(
            $pivotRows,
            ['service_id', 'zone_id'],
            ['updated_at']
        );

        $total = count($arrondissementsRows) + count($villesRows);
        $this->command->info("✅ {$total} zones insérées · " . count($pivotRows) . " liaisons service↔zone créées.");
    }
}
