<?php

use App\Http\Controllers\Api\ActualiteController;
use App\Http\Controllers\Api\ChatbotConfigController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\DevisController;
use App\Http\Controllers\Api\FaqController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\SubServiceController;
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
Route::post('/devis', [DevisController::class, 'store'])
    ->middleware('throttle:5,1');
    Route::get('/actualites', [ActualiteController::class, 'publicIndex']);
Route::get('/services', [ServiceController::class, 'publicIndex']);

// Routes admin (protégées par Sanctum ou autre guard)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin/contacts', [ContactController::class, 'index']);
    Route::patch('/admin/contacts/{contact}/read', [ContactController::class, 'markAsRead']);
    Route::delete('/admin/contacts/{contact}', [ContactController::class, 'destroy']);
    Route::prefix('chatbot-config')->group(function () {


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
     Route::get('/admin/devis',                       [DevisController::class, 'index']);
    Route::get('/admin/devis/{devis}',               [DevisController::class, 'show']);
    Route::patch('/admin/devis/{devis}/statut',      [DevisController::class, 'updateStatut']);
    Route::delete('/admin/devis/{devis}',            [DevisController::class, 'destroy']);
    Route::get   ('/admin/services',                    [ServiceController::class, 'index']);
    Route::post  ('/admin/services',                    [ServiceController::class, 'store']);
    Route::get   ('/admin/services/{service}',          [ServiceController::class, 'show']);
    Route::put   ('/admin/services/{service}',          [ServiceController::class, 'update']);
    Route::delete('/admin/services/{service}',          [ServiceController::class, 'destroy']);
    Route::patch ('/admin/services/reorder',            [ServiceController::class, 'reorder']);

    // Sous-services
    Route::get   ('/admin/sub-services',                [SubServiceController::class, 'index']);
    Route::post  ('/admin/sub-services',                [SubServiceController::class, 'store']);
    Route::get   ('/admin/sub-services/{subService}',   [SubServiceController::class, 'show']);
    Route::put   ('/admin/sub-services/{subService}',   [SubServiceController::class, 'update']);
    Route::delete('/admin/sub-services/{subService}',   [SubServiceController::class, 'destroy']);
    Route::patch ('/admin/sub-services/{subService}/toggle', [SubServiceController::class, 'toggle']);
    Route::patch ('/admin/sub-services/reorder',        [SubServiceController::class, 'reorder']);

    // Upload image sous-service
    Route::post('/admin/sub-services/upload-image',     [SubServiceController::class, 'uploadImage']);
    Route::get   ('/admin/actualites',                       [ActualiteController::class, 'index']);
    Route::post  ('/admin/actualites',                       [ActualiteController::class, 'store']);
    Route::get   ('/admin/actualites/{actualite}',           [ActualiteController::class, 'show']);
    Route::put   ('/admin/actualites/{actualite}',           [ActualiteController::class, 'update']);
    Route::delete('/admin/actualites/{actualite}',           [ActualiteController::class, 'destroy']);
    Route::patch ('/admin/actualites/{actualite}/toggle',    [ActualiteController::class, 'toggle']);
    Route::post  ('/admin/actualites/upload-image',          [ActualiteController::class, 'uploadImage']);

});

        Route::get('/chatbot-config',         [ChatbotConfigController::class, 'index']);
