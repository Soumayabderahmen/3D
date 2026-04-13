<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sub_services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')
                  ->constrained('services')
                  ->onDelete('cascade');
            $table->string('slug');
            $table->string('title');
            $table->string('icon')->default('📦');
            $table->text('desc')->nullable();
            $table->text('long_desc')->nullable();
            $table->string('image')->nullable();
            $table->jsonb('prestations')->default('[]');   // PostgreSQL JSONB
            $table->jsonb('sections')->default('[]');      // [{title, text}]
            $table->integer('order')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();

            $table->unique(['service_id', 'slug']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sub_services');
    }
};
