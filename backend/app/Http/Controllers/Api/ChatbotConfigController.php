<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ChatbotConfig;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChatbotConfigController extends Controller
{
    // ─────────────────────────────────────────────────────────────
    // GET /api/chatbot-config
    // Retourne la config active (toujours 1 seule ligne en base)
    // ─────────────────────────────────────────────────────────────
    public function index(): JsonResponse
    {
        $config = ChatbotConfig::first();

        if (!$config) {
            return response()->json([
                'message' => 'Aucune configuration trouvée.',
                'data'    => null,
            ], 404);
        }

        return response()->json([
            'message' => 'Configuration récupérée avec succès.',
            'data'    => $config,
        ], 200);
    }

    // ─────────────────────────────────────────────────────────────
    // POST /api/chatbot-config
    // Crée une configuration (si aucune n'existe)
    // ─────────────────────────────────────────────────────────────
    public function store(Request $request): JsonResponse
    {
        if (ChatbotConfig::count() > 0) {
            return response()->json([
                'message' => 'Une configuration existe déjà. Utilisez PUT pour la modifier.',
            ], 409);
        }

        $validator = Validator::make($request->all(), $this->rules());

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erreur de validation.',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $config = ChatbotConfig::create($validator->validated());

        return response()->json([
            'message' => 'Configuration créée avec succès.',
            'data'    => $config,
        ], 201);
    }

    // ─────────────────────────────────────────────────────────────
    // GET /api/chatbot-config/{id}
    // Retourne une config par son ID
    // ─────────────────────────────────────────────────────────────
    public function show(int $id): JsonResponse
    {
        $config = ChatbotConfig::find($id);

        if (!$config) {
            return response()->json(['message' => 'Configuration introuvable.'], 404);
        }

        return response()->json([
            'message' => 'Configuration récupérée.',
            'data'    => $config,
        ], 200);
    }

    // ─────────────────────────────────────────────────────────────
    // PUT /api/chatbot-config/{id}
    // Met à jour une configuration existante
    // ─────────────────────────────────────────────────────────────
    public function update(Request $request, int $id): JsonResponse
    {
        $config = ChatbotConfig::find($id);

        if (!$config) {
            return response()->json(['message' => 'Configuration introuvable.'], 404);
        }

        $validator = Validator::make($request->all(), $this->rules());

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erreur de validation.',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $config->update($validator->validated());

        return response()->json([
            'message' => 'Configuration mise à jour avec succès.',
            'data'    => $config->fresh(),
        ], 200);
    }

    // ─────────────────────────────────────────────────────────────
    // PATCH /api/chatbot-config/{id}/toggle
    // Active / désactive le chatbot rapidement
    // ─────────────────────────────────────────────────────────────
    public function toggle(int $id): JsonResponse
    {
        $config = ChatbotConfig::find($id);

        if (!$config) {
            return response()->json(['message' => 'Configuration introuvable.'], 404);
        }

        $config->update(['enabled' => !$config->enabled]);

        return response()->json([
            'message' => 'Statut mis à jour.',
            'data'    => $config->fresh(),
        ], 200);
    }

    // ─────────────────────────────────────────────────────────────
    // DELETE /api/chatbot-config/{id}
    // Supprime une configuration
    // ─────────────────────────────────────────────────────────────
    public function destroy(int $id): JsonResponse
    {
        $config = ChatbotConfig::find($id);

        if (!$config) {
            return response()->json(['message' => 'Configuration introuvable.'], 404);
        }

        $config->delete();

        return response()->json([
            'message' => 'Configuration supprimée avec succès.',
        ], 200);
    }

    // ─────────────────────────────────────────────────────────────
    // Règles de validation communes
    // ─────────────────────────────────────────────────────────────
    private function rules(): array
    {
        return [
            'welcome_message'  => 'required|string|max:1000',
            'system_prompt'    => 'required|string|max:2000',
            'proactive_delay'  => 'required|integer|min:0|max:3600',
            'proactive_message'=> 'required|string|max:500',
            'suggestions'      => 'nullable|array',
            'suggestions.*.text'    => 'required_with:suggestions|string|max:200',
            'suggestions.*.response'=> 'required_with:suggestions|string|max:1000',
            'max_messages'     => 'required|integer|min:1|max:500',
            'enabled'          => 'required|boolean',
        ];
    }
}
