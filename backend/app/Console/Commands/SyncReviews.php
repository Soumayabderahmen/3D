<?php

namespace App\Console\Commands;

use App\Models\Review;
use App\Services\SerpApiService;
use Illuminate\Console\Command;

class SyncReviews extends Command
{
    protected $signature   = 'reviews:sync';
    protected $description = 'Synchronise les avis Google via SerpAPI';

    public function handle(SerpApiService $serp): int
    {
        $this->info('🔄 Synchronisation des avis en cours...');

        try {
            $data   = $serp->getGoogleReviews();
            $synced = 0;

            foreach ($data['reviews'] ?? [] as $review) {
                Review::updateOrCreate(
                    ['source_id' => $review['review_id'] ?? null],
                    [
                        'author_name' => $review['user']['name']      ?? null,
                        'text'        => $review['snippet']           ?? null,
                        'rating'      => (int) ($review['rating']     ?? 0),
                        'place_name'  => $data['place_info']['title'] ?? null,
                        'review_url'  => $review['user']['link']      ?? null,
                    ]
                );
                $synced++;
            }

            $this->info("✅ {$synced} avis synchronisés avec succès.");
            return Command::SUCCESS;

        } catch (\Exception $e) {
            $this->error('❌ Erreur : ' . $e->getMessage());
            return Command::FAILURE;
        }
    }
}
