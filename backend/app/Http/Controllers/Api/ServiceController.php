<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServiceRequest;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /** GET /api/admin/services */
    public function index(): JsonResponse
    {
        $services = Service::withCount('subServices')
            ->ordered()
            ->get();

        return response()->json($services);
    }

    /** GET /api/services  (public — pour le front) */
    public function publicIndex(): JsonResponse
    {
        $services = Service::with('activeSubServices')
            ->active()
            ->ordered()
            ->get();

        return response()->json($services);
    }

    /** POST /api/admin/services */
    public function store(StoreServiceRequest $request): JsonResponse
    {
        $data = $request->validated();

        // Ordre automatique si non fourni
        if (!isset($data['order'])) {
            $data['order'] = Service::max('order') + 1;
        }

        $service = Service::create($data);

        return response()->json($service->load('subServices'), 201);
    }

    /** GET /api/admin/services/{service} */
    public function show(Service $service): JsonResponse
    {
        return response()->json($service->load('subServices'));
    }

    /** PUT /api/admin/services/{service} */
    public function update(StoreServiceRequest $request, Service $service): JsonResponse
    {
        $service->update($request->validated());

        return response()->json($service->fresh('subServices'));
    }

    /** DELETE /api/admin/services/{service} */
    public function destroy(Service $service): JsonResponse
    {
        $service->delete(); // cascade vers sub_services via FK

        return response()->json(['success' => true]);
    }

    /** PATCH /api/admin/services/reorder — réordonner via drag-and-drop */
    public function reorder(Request $request): JsonResponse
    {
        $request->validate([
            'ids'   => 'required|array',
            'ids.*' => 'integer|exists:services,id',
        ]);

        foreach ($request->ids as $position => $id) {
            Service::where('id', $id)->update(['order' => $position]);
        }

        return response()->json(['success' => true]);
    }
}
