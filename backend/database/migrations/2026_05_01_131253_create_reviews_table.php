<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
      Schema::create('reviews', function (Blueprint $table) {
    $table->id();
    $table->string('source_id')->nullable(); 
    $table->string('author_name')->nullable();
    $table->text('text')->nullable();
    $table->integer('rating')->nullable();
    $table->string('place_name')->nullable();
    $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
