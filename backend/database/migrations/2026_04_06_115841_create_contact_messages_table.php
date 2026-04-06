<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            $table->string('prenom');
            $table->string('nom')->nullable();
            $table->string('tel');
            $table->string('email');
            $table->string('sujet')->nullable();
            $table->text('message')->nullable();
            $table->enum('statut', ['nouveau', 'lu', 'traite'])->default('nouveau');
            $table->timestamp('lu_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_messages');
    }
};
