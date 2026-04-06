<?php

use App\Http\Controllers\Api\ChatbotConfigController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\FaqController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\ProfileController;
use Illuminate\Support\Facades\Route;

// 🔓 Public
Route::post('/login', [AuthController::class, 'login']);

// 🔐 Protégé
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Profile
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::post('/profile/avatar', [ProfileController::class, 'updateAvatar']);
    Route::put('/profile/password', [ProfileController::class, 'updatePassword']);

    // FAQs
    Route::apiResource('faqs', FaqController::class);
    Route::patch('/faqs/{faq}/toggle', [FaqController::class, 'toggle']);
    Route::post('/faqs/reorder', [FaqController::class, 'reorder']);
});
Route::post('/contact', [ContactController::class, 'store'])
    ->middleware('throttle:5,1'); // max 5 requêtes/minute par IP

// Routes admin (protégées par Sanctum ou autre guard)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin/contacts', [ContactController::class, 'index']);
    Route::patch('/admin/contacts/{contact}/read', [ContactController::class, 'markAsRead']);
    Route::delete('/admin/contacts/{contact}', [ContactController::class, 'destroy']);
    Route::prefix('chatbot-config')->group(function () {

        // GET    /api/chatbot-config          → récupère la config active

        // POST   /api/chatbot-config          → crée la config (première fois)
        Route::post('/',        [ChatbotConfigController::class, 'store']);

        // GET    /api/chatbot-config/{id}     → récupère par ID
        Route::get('/{id}',     [ChatbotConfigController::class, 'show']);

        // PUT    /api/chatbot-config/{id}     → mise à jour complète
        Route::put('/{id}',     [ChatbotConfigController::class, 'update']);

        // PATCH  /api/chatbot-config/{id}/toggle → active/désactive
        Route::patch('/{id}/toggle', [ChatbotConfigController::class, 'toggle']);

        // DELETE /api/chatbot-config/{id}     → supprime la config
        Route::delete('/{id}',  [ChatbotConfigController::class, 'destroy']);
    });
});
        Route::get('/chatbot-config',         [ChatbotConfigController::class, 'index']);
