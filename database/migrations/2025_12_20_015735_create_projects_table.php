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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Nama Proyek (Misal: Mini SIMRS)
            $table->string('slug')->unique(); // Untuk URL (Misal: mini-simrs)
            $table->text('description'); // Penjelasan umum
            
            // Kolom JSON biar bisa simpan array. Contoh: ["Laravel", "React", "MySQL"]
            $table->json('tech_stack'); 
            
            // Dua kolom ini SANGAT PENTING untuk AI "menjual" kemampuan Habib
            $table->text('problem_solved'); // Masalah apa yang diselesaikan?
            $table->text('impact'); // Apa dampak positifnya? (Misal: Efisiensi naik 40%)
            
            $table->string('github_link')->nullable();
            $table->string('demo_link')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
