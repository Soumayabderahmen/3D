<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

// ─── Quote inspirante (existante) ─────────────────────────────────────────────
Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// ─── Sync avis Google toutes les 10 jours ─────────────────────────────────────
// Cron "0 3 */10 * *" = à 3h00, tous les 10 jours
Schedule::command('reviews:sync')
    ->cron('0 3 */10 * *')
    ->withoutOverlapping()
    ->runInBackground()
    ->onSuccess(function () {
        \Illuminate\Support\Facades\Log::info('✅ reviews:sync OK');
    })
    ->onFailure(function () {
        \Illuminate\Support\Facades\Log::error('❌ reviews:sync FAILED');
    });
