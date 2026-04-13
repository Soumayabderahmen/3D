<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('devis', function (Blueprint $table) {
            $table->id();

            // Étape 1 — Besoin
            $table->string('service');          // debarras, demolition, desamiantage, nettoyage
            $table->string('place');            // appartement, maison, cave, bureau, autre

            // Étape 2 — Situation
            $table->string('volume')->nullable();
            $table->string('departement')->nullable();
            $table->date('date_souhaitee')->nullable();
            $table->boolean('urgent')->default(false);

            // Étape 3 — Coordonnées
            $table->string('prenom');
            $table->string('nom')->nullable();
            $table->string('tel');
            $table->string('email');
            $table->text('message')->nullable();

            // Gestion admin
            $table->enum('statut', ['nouveau', 'en_cours', 'traite', 'annule'])->default('nouveau');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('devis');
    }
};
