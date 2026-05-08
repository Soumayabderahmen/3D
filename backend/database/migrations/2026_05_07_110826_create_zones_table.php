<?php
// database/migrations/xxxx_create_zones_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('zones', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['arrondissement', 'ville']);
            $table->string('slug')->unique();
            $table->string('nom');
            $table->unsignedTinyInteger('num')->nullable(); // arrondissement uniquement
            $table->string('dep', 3);
            $table->unsignedSmallInteger('dist_km')->default(0);
            $table->json('quartiers')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        Schema::create('service_zone', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->constrained()->cascadeOnDelete();
            $table->foreignId('zone_id')->constrained('zones')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['service_id', 'zone_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_zone');
        Schema::dropIfExists('zones');
    }
};
