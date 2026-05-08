<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Services\SerpApiService;

class ReviewController extends Controller
{// ReviewController.php

public function sync(SerpApiService $serp)
{
    $data = $serp->getGoogleReviews();

    foreach ($data['reviews'] ?? [] as $review) {
        Review::updateOrCreate(
            ['source_id' => $review['review_id'] ?? null], // ← 'id' → 'review_id'
            [
                'author_name' => $review['user']['name'] ?? null,
                'text'        => $review['snippet'] ?? null,
                'rating'      => (int) $review['rating'] ?? null,
                'place_name'  => $data['place_info']['title'] ?? null,
            ]
        );
    }

    return response()->json(['message' => 'Reviews synced successfully']);
}
    public function index()
    {
        return Review::latest()->get();
    }
}
