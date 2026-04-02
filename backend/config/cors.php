<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    /*
    |--------------------------------------------------------------------------
    | Paths
    |--------------------------------------------------------------------------
    | Les routes Laravel concernées par CORS.
    | 'api/*' couvre toutes vos routes API (/api/devis, /api/chat, etc.)
    | 'sanctum/csrf-cookie' est nécessaire si vous utilisez l'auth Sanctum
    |
    */

    'paths' => [
        'api/*',
        'sanctum/csrf-cookie',
    ],

    /*
    |--------------------------------------------------------------------------
    | Allowed Methods
    |--------------------------------------------------------------------------
    | Les méthodes HTTP autorisées depuis Next.js.
    | GET    → récupérer des données
    | POST   → envoyer formulaire, chatbot
    | PUT    → mettre à jour
    | PATCH  → mise à jour partielle
    | DELETE → supprimer
    | OPTIONS → preflight CORS (obligatoire, ne pas supprimer)
    |
    */

    'allowed_methods' => [
        'GET',
        'POST',
        'PUT',
        'PATCH',
        'DELETE',
        'OPTIONS',
    ],

    /*
    |--------------------------------------------------------------------------
    | Allowed Origins
    |--------------------------------------------------------------------------
    | Les domaines autorisés à appeler votre API Laravel.
    |
    | DÉVELOPPEMENT :
    |   - http://localhost:3000      → Next.js en local
    |   - http://127.0.0.1:3000     → alternative localhost
    |
    | PRODUCTION :
    |   - https://votre-domaine.fr  → remplacez par votre vrai domaine
    |   - https://www.votre-domaine.fr
    |
    | ⚠️  Ne jamais mettre '*' en production → sécurité critique
    |
    */

    'allowed_origins' => [
        // Développement local
        'http://localhost:3000',
        'http://127.0.0.1:3000',

        // Production — remplacez par votre domaine réel
        'https://nettoyage-debarras-paris.fr',
        'https://www.nettoyage-debarras-paris.fr',

        // Vercel preview deployments (optionnel)
        // 'https://votre-projet.vercel.app',
    ],

    /*
    |--------------------------------------------------------------------------
    | Allowed Origins Patterns
    |--------------------------------------------------------------------------
    | Utiliser des patterns regex si vous avez des sous-domaines dynamiques.
    | Exemple Vercel : toutes les previews du projet
    |
    | Décommentez si nécessaire :
    | '#^https://votre-projet-.*\.vercel\.app$#'
    |
    */

    'allowed_origins_patterns' => [
        // '#^https://votre-projet-.*\.vercel\.app$#',
    ],

    /*
    |--------------------------------------------------------------------------
    | Allowed Headers
    |--------------------------------------------------------------------------
    | Les headers HTTP que Next.js peut envoyer dans ses requêtes.
    |
    | Content-Type    → obligatoire pour envoyer du JSON
    | Accept          → indique qu'on attend du JSON en retour
    | Authorization   → pour les tokens d'authentification
    | X-Requested-With → identifie les requêtes AJAX
    | X-CSRF-TOKEN   → protection CSRF Laravel
    | X-XSRF-TOKEN   → protection CSRF cookie
    |
    */

    'allowed_headers' => [
        'Content-Type',
        'Accept',
        'Authorization',
        'X-Requested-With',
        'X-CSRF-TOKEN',
        'X-XSRF-TOKEN',
    ],

    /*
    |--------------------------------------------------------------------------
    | Exposed Headers
    |--------------------------------------------------------------------------
    | Headers que le navigateur peut lire dans la réponse de Laravel.
    | Laissez vide sauf besoin spécifique (ex: pagination dans les headers).
    |
    */

    'exposed_headers' => [],

    /*
    |--------------------------------------------------------------------------
    | Max Age
    |--------------------------------------------------------------------------
    | Durée en secondes pendant laquelle le navigateur met en cache
    | la réponse preflight OPTIONS.
    | 0     = pas de cache (développement)
    | 7200  = 2 heures (recommandé en production)
    |
    */

    'max_age' => 0,

    /*
    |--------------------------------------------------------------------------
    | Supports Credentials
    |--------------------------------------------------------------------------
    | Autoriser l'envoi de cookies et headers d'authentification
    | dans les requêtes cross-origin.
    |
    | true  → nécessaire si vous utilisez Laravel Sanctum (sessions/cookies)
    | false → suffisant si vous utilisez uniquement des tokens Bearer
    |
    | ⚠️  Si true, 'allowed_origins' ne peut PAS contenir '*'
    |
    */

    'supports_credentials' => true,

];
