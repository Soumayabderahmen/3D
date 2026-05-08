<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;

class SerpApiService
{
    protected string $apiKey;
    protected string $dataId;

    public function __construct()
    {
        $this->apiKey = env('SERPAPI_KEY');
        $this->dataId = env('SERPAPI_DATA_ID');
    }

    public function getGoogleReviews(): array
    {
        $response = Http::get('https://serpapi.com/search.json', [
            'engine'  => 'google_maps_reviews',
            'api_key' => $this->apiKey,
            'data_id' => $this->dataId,
            'hl'      => 'fr',
        ]);

        return $response->json();
    }
}
