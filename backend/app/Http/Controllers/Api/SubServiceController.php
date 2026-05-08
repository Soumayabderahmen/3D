<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSubServiceRequest;
use App\Models\Service;
use App\Models\SubService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SubServiceController extends Controller
{
    /** GET /api/admin/sub-services?service_id=X */
    public function index(Request $request): JsonResponse
    {
        $query = SubService::with('service')->ordered();

        if ($request->filled('service_id')) {
            $query->where('service_id', $request->service_id);
        }

        return response()->json($query->get());
    }
 public function publicIndex(Request $request): JsonResponse
{
    $query = SubService::with('service')->active()->ordered();

    if ($request->filled('service_id')) {
        $query->where('service_id', $request->service_id);
    }

    // ← ajouter ce filtre par slug
    if ($request->filled('service_slug')) {
        $query->whereHas('service', fn($q) => $q->where('slug', $request->service_slug));
    }

    return response()->json($query->get());
}
    /** POST /api/admin/sub-services */
    public function store(StoreSubServiceRequest $request): JsonResponse
    {
        $data = $request->validated();

        if (!isset($data['order'])) {
            $data['order'] = SubService::where('service_id', $data['service_id'])->max('order') + 1;
        }

        $sub = SubService::create($data);

        return response()->json($sub->load('service'), 201);
    }

    /** GET /api/admin/sub-services/{subService} */
    public function show(SubService $subService): JsonResponse
    {
        return response()->json($subService->load('service'));
    }

    /** PUT /api/admin/sub-services/{subService} */
    public function update(StoreSubServiceRequest $request, SubService $subService): JsonResponse
    {
        $subService->update($request->validated());

        return response()->json($subService->fresh('service'));
    }

    /** DELETE /api/admin/sub-services/{subService} */
    public function destroy(SubService $subService): JsonResponse
    {
        // Supprimer l'image stockée si présente
        if ($subService->image && str_starts_with($subService->image, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $subService->image));
        }

        $subService->delete();

        return response()->json(['success' => true]);
    }

    /** PATCH /api/admin/sub-services/{subService}/toggle — activer/désactiver */
    public function toggle(SubService $subService): JsonResponse
    {
        $subService->update(['active' => !$subService->active]);

        return response()->json(['success' => true, 'active' => $subService->active]);
    }

    /** PATCH /api/admin/sub-services/reorder */
    public function reorder(Request $request): JsonResponse
    {
        $request->validate([
            'ids'   => 'required|array',
            'ids.*' => 'integer|exists:sub_services,id',
        ]);

        foreach ($request->ids as $position => $id) {
            SubService::where('id', $id)->update(['order' => $position]);
        }

        return response()->json(['success' => true]);
    }

    /** POST /api/admin/sub-services/upload-image */
    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,webp|max:3072', // 3 MB max
        ]);

        $path = $request->file('image')->store('sub-services', 'public');

        return response()->json(['url' => '/storage/'.$path]);
    }

    public function showBySlug(string $slug): JsonResponse
{
    $sub = SubService::with('service')
        ->where('slug', $slug)
        ->where('active', true)
        ->firstOrFail();

    return response()->json([
        'id'          => $sub->id,
        'slug'        => $sub->slug,
        'title'       => $sub->title,
        'icon'        => $sub->icon,
        'desc'        => $sub->desc,
        'long_desc'   => $sub->long_desc,
        'image'       => $sub->image,
        'prestations' => $sub->prestations,
        'sections'    => $sub->sections,
        'order'       => $sub->order,
        'active'      => $sub->active,
        'service'     => [
            'id'    => $sub->service->id,
            'slug'  => $sub->service->slug,
            'title' => $sub->service->title,
        ],
    ]);
}
}
