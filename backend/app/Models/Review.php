<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
  protected $fillable = [
        'source_id',
        'author_name',
        'text',
        'rating',
        'place_name',
        'review_url'
    ];}
