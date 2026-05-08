<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\Zone;
use Illuminate\Http\JsonResponse;

class ZoneController extends Controller
{
    /**
     * GET /api/services/{slug}/zones
     * Retourne arrondissements + villes liés à un service
     */
   public function byService(string $slug): JsonResponse
{
    $service = Service::where('slug', $slug)
        ->where('active', true)
        ->firstOrFail();

    $zones = $service->zones()
        ->where('zones.active', true)
        ->orderBy('zones.dist_km')
        ->orderBy('zones.num')
        ->get([
            'zones.id', 'zones.type', 'zones.slug', 'zones.nom',
            'zones.num', 'zones.dep', 'zones.dist_km', 'zones.quartiers',
        ])
        ->map(fn($z) => [                    // ← supprime le pivot
            'id'       => $z->id,
            'type'     => $z->type,
            'slug'     => $z->slug,
            'nom'      => $z->nom,
            'num'      => $z->num,
            'dep'      => $z->dep,
            'dist_km'  => $z->dist_km,
            'quartiers'=> is_string($z->quartiers)
                            ? json_decode($z->quartiers, true)
                            : ($z->quartiers ?? []),
        ]);

    [$arrondissements, $villes] = $zones->partition(fn($z) => $z['type'] === 'arrondissement');

    return response()->json([
        'service'         => $slug,
        'arrondissements' => $arrondissements->values(),
        'villes'          => $villes->values(),
    ]);
}

public function show(string $slug, string $zoneSlug): JsonResponse
{
    $service = Service::where('slug', $slug)
        ->where('active', true)
        ->firstOrFail();

    $zone = $service->zones()
        ->where('zones.slug', $zoneSlug)
        ->where('zones.active', true)
        ->firstOrFail([
            'zones.id', 'zones.type', 'zones.slug', 'zones.nom',
            'zones.num', 'zones.dep', 'zones.dist_km', 'zones.quartiers',
        ]);

    return response()->json([              // ← supprime le pivot
        'id'        => $zone->id,
        'type'      => $zone->type,
        'slug'      => $zone->slug,
        'nom'       => $zone->nom,
        'num'       => $zone->num,
        'dep'       => $zone->dep,
        'dist_km'   => $zone->dist_km,
        'quartiers' => is_string($zone->quartiers)
                        ? json_decode($zone->quartiers, true)
                        : ($zone->quartiers ?? []),
    ]);
}
public function index(): JsonResponse
{
    $zones = Zone::active()
        ->ordered()
        ->get([
            'zones.id',
            'zones.type',
            'zones.slug',
            'zones.nom',
            'zones.num',
            'zones.dep',
            'zones.dist_km',
            'zones.quartiers',
        ]);

    [$arrondissements, $villes] = $zones->partition(fn($z) => $z->type === 'arrondissement');

    return response()->json([
        'arrondissements' => $arrondissements->values(),
        'villes'          => $villes->values(),
    ]);
}
/**
 * GET /api/services/{slug}/resolve/{subSlug}
 * Détermine si subSlug est un sub-service ou une zone
 */
public function resolve(string $slug, string $subSlug): JsonResponse
{
    $service = Service::where('slug', $slug)
        ->where('active', true)
        ->firstOrFail();

    // Vérifier sub-service
    $isSubService = $service->subServices()
        ->where('slug', $subSlug)
        ->where('active', true)
        ->exists();

    if ($isSubService) {
        return response()->json(['type' => 'sub-service']);
    }

    // Vérifier zone
    $isZone = $service->zones()
        ->where('zones.slug', $subSlug)
        ->where('zones.active', true)
        ->exists();

    if ($isZone) {
        return response()->json(['type' => 'zone']);
    }

    return response()->json(['type' => 'not-found'], 404);
}
}
