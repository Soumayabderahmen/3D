<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\faqs;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class FaqController extends Controller
{
    /**
     * GET /api/faqs
     * Retourne toutes les FAQs triées par order.
     */
    public function index(): JsonResponse
    {
        $faqs = faqs::ordered()->get();

        return response()->json($faqs);
    }

    /**
     * POST /api/faqs
     * Crée une nouvelle FAQ.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'question' => 'required|string|max:500',
            'answer'   => 'required|string',
            'active'   => 'boolean',
            'order'    => 'integer|min:0',
        ]);

        // Si order non fourni, on le place en dernier
        if (!isset($validated['order'])) {
            $validated['order'] = faqs::max('order') + 1;
        }

        $faq = faqs::create($validated);

        return response()->json($faq, 201);
    }

    /**
     * GET /api/faqs/{id}
     * Retourne une FAQ par son ID.
     */
    public function show(faqs $faq): JsonResponse
    {
        return response()->json($faq);
    }

    /**
     * PUT /api/faqs/{id}
     * Met à jour une FAQ existante.
     */
    public function update(Request $request, faqs $faq): JsonResponse
    {
        $validated = $request->validate([
            'question' => 'sometimes|required|string|max:500',
            'answer'   => 'sometimes|required|string',
            'active'   => 'sometimes|boolean',
            'order'    => 'sometimes|integer|min:0',
        ]);

        $faq->update($validated);

        return response()->json($faq);
    }

    /**
     * PATCH /api/faqs/{id}/toggle
     * Bascule le statut actif/inactif.
     */
    public function toggle(faqs $faq): JsonResponse
    {
        $faq->update(['active' => !$faq->active]);

        return response()->json($faq);
    }

    /**
     * DELETE /api/faqs/{id}
     * Supprime une FAQ.
     */
    public function destroy(faqs $faq): JsonResponse
    {
        $faq->delete();

        return response()->json(['message' => 'FAQ supprimée avec succès.']);
    }

    /**
     * POST /api/faqs/reorder
     * Réordonne les FAQs. Body: { ids: [3, 1, 2, ...] }
     */
    public function reorder(Request $request): JsonResponse
    {
        $request->validate([
            'ids'   => 'required|array',
            'ids.*' => 'integer|exists:faqs,id',
        ]);

        foreach ($request->ids as $index => $id) {
            faqs::where('id', $id)->update(['order' => $index + 1]);
        }

        return response()->json(['message' => 'Ordre mis à jour.']);
    }
}
