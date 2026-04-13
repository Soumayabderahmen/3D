<?php

namespace App\Http\Controllers\Api;

use App\Events\DevisCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDevisRequest;
use App\Mail\NouveauDevisMail;
use App\Models\Devis;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class DevisController extends Controller
{
    /**
     * Enregistrer une demande de devis et notifier l'admin.
     */
   public function store(StoreDevisRequest $request): JsonResponse
{
    $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
    'secret' => env('RECAPTCHA_SECRET'),
    'response' => $request->captcha,
]);

if (!$response->json('success')) {
    return response()->json(['message' => 'Captcha invalide'], 422);
}
    // 1️⃣ Créer le devis
    $devis = Devis::create($request->validated());

    // 2️⃣ Envoyer l'email à l'admin
    try {
        Mail::to(config('mail.admin_email', env('ADMIN_EMAIL', 'jlidioumaima01@gmail.com')))
            ->send(new NouveauDevisMail($devis));
    } catch (\Throwable $e) {
        Log::error('Devis mail failed: ' . $e->getMessage(), ['devis_id' => $devis->id]);
    }

    // 3️⃣ Déclencher l'event WhatsApp
    try {
        event(new DevisCreated($devis));
    } catch (\Throwable $e) {
        Log::error('Devis WhatsApp event failed: ' . $e->getMessage(), ['devis_id' => $devis->id]);
    }

    // 4️⃣ Réponse JSON
    return response()->json([
        'success' => true,
        'message' => 'Votre demande de devis a bien été envoyée. Nous vous recontacterons dans les 2 heures.',
        'data'    => ['id' => $devis->id],
    ], 201);
}

    /**
     * Liste des devis (admin protégé).
     */
    public function index(): JsonResponse
    {
        $devis = Devis::orderByDesc('created_at')->paginate(20);

        return response()->json($devis);
    }

    /**
     * Détail d'un devis.
     */
    public function show(Devis $devis): JsonResponse
    {
        return response()->json($devis);
    }

    /**
     * Changer le statut d'un devis.
     */
    public function updateStatut(Devis $devis): JsonResponse
    {
        request()->validate([
            'statut' => 'required|in:nouveau,en_cours,traite,annule',
        ]);

        $devis->update(['statut' => request('statut')]);

        return response()->json(['success' => true, 'statut' => $devis->statut]);
    }

    /**
     * Supprimer un devis.
     */
    public function destroy(Devis $devis): JsonResponse
    {
        $devis->delete();

        return response()->json(['success' => true]);
    }
}
