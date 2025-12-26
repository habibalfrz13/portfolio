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
    Schema::create('chat_logs', function (Blueprint $table) {
        $table->id();
        $table->text('user_question'); // Pertanyaan User
        $table->text('ai_response');   // Jawaban Gemini
        $table->string('ip_address')->nullable(); // Alamat IP (Opsional, buat deteksi spam)
        $table->string('user_agent')->nullable(); // Browser yg dipakai (Opsional)
        $table->timestamps(); // Mencatat waktu kejadian
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chat_logs');
    }
};
