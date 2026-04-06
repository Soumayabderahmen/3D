<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Mail\NouveauContactMail;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /**
     * Enregistrer un message de contact et notifier l'admin.
     */
    public function store(StoreContactRequest $request): JsonResponse
    {
        // 1. Sauvegarde en base
        $contact = ContactMessage::create($request->validated());

        // 2. Envoi email admin
        try {
            Mail::to(config('mail.admin_email', env('ADMIN_EMAIL', 'jlidioumaima01@gmail.com')))
                ->send(new NouveauContactMail($contact));
        } catch (\Throwable $e) {
            // On ne bloque pas la réponse si l'email échoue
            Log::error('Contact mail failed: ' . $e->getMessage(), ['contact_id' => $contact->id]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Votre message a bien été envoyé. Nous vous recontacterons très rapidement.',
            'data'    => [
                'id'     => $contact->id,
                'prenom' => $contact->prenom,
            ],
        ], 201);
    }

    /**
     * Liste des messages (pour interface admin protégée)
     */
    public function index(): JsonResponse
    {
        $messages = ContactMessage::orderByDesc('created_at')
            ->paginate(20);

        return response()->json($messages);
    }

    /**
     * Marquer comme lu
     */
    public function markAsRead(ContactMessage $contact): JsonResponse
    {
        $contact->marquerCommentLu();

        return response()->json(['success' => true]);
    }

    /**
     * Supprimer un message
     */
    public function destroy(ContactMessage $contact): JsonResponse
    {
        $contact->delete();

        return response()->json(['success' => true]);
    }
}
