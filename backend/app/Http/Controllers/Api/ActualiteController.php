<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreActualiteRequest;
use App\Models\Actualite;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ActualiteController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Actualite::with('service')->ordered();

        // Filtre par service
        if ($request->filled('service_id')) {
            $query->where('service_id', $request->service_id);
        }

        // Filtre publié/non publié
        if ($request->filled('published')) {
            $query->where(
                'published',
                filter_var($request->published, FILTER_VALIDATE_BOOLEAN)
            );
        }

        // Recherche titre
        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        return response()->json($query->paginate(20));
    }

    public function publicIndex(): JsonResponse
    {
        $actualites = Actualite::with('service')
            ->published()
            ->ordered()
            ->paginate(12);
  $actualites->getCollection()->transform(function ($item) {
    if ($item->image_before) {
        $item->image_before = asset($item->image_before); // ne rajoute pas "storage/" si déjà présent
    }
    if ($item->image_after) {
        $item->image_after = asset($item->image_after);
    }
    return $item;
});
        return response()->json($actualites);
    }

    public function store(StoreActualiteRequest $request): JsonResponse
    {
        $data = $request->validated();

        if (!isset($data['order'])) {
            $data['order'] = (Actualite::max('order') ?? 0) + 1;
        }

        $actualite = Actualite::create($data);

        return response()->json(
            $actualite->load('service'),
            201
        );
    }

    public function show(Actualite $actualite): JsonResponse
    {
        return response()->json($actualite->load('service'));
    }
public function showById($id): JsonResponse
{
    $actualite = Actualite::with('service')->find($id);

    if (!$actualite) {
        return response()->json(['message' => 'Not found'], 404);
    }

    // Corriger les URLs des images avant / après
    if ($actualite->image_before) {
        $path = ltrim($actualite->image_before, '/');
        $path = preg_replace('#^storage/#', '', $path); // supprimer "storage/" du début si présent
        $actualite->image_before = asset('storage/' . $path);
    }

    if ($actualite->image_after) {
        $path = ltrim($actualite->image_after, '/');
        $path = preg_replace('#^storage/#', '', $path);
        $actualite->image_after = asset('storage/' . $path);
    }

    return response()->json($actualite);
}
    public function update(
        StoreActualiteRequest $request,
        Actualite $actualite
    ): JsonResponse {
        $actualite->update($request->validated());

        return response()->json(
            $actualite->fresh()->load('service')
        );
    }

    public function destroy(Actualite $actualite): JsonResponse
    {
        foreach (['image_before', 'image_after'] as $field) {
            if (
                $actualite->$field &&
                str_starts_with($actualite->$field, '/storage/')
            ) {
                Storage::disk('public')->delete(
                    str_replace('/storage/', '', $actualite->$field)
                );
            }
        }

        $actualite->delete();

        return response()->json(['success' => true]);
    }

    public function toggle(Actualite $actualite): JsonResponse
    {
        $actualite->update([
            'published' => !$actualite->published
        ]);

        return response()->json([
            'success'   => true,
            'published' => $actualite->published,
        ]);
    }

    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,jpg,png,webp|max:4096',
        ]);

        $path = $request->file('image')->store('actualites', 'public');
        $url  = Storage::url($path);

        return response()->json(['url' => $url]);
    }
}
