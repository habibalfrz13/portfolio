<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // database/migrations/xxxx_xx_xx_xxxxxx_create_experiences_table.php

    public function up(): void
    {
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->string('company'); // Misal: RSIA ANDINI
            $table->string('role');    // Misal: Fullstack Developer Intern
            $table->string('location')->nullable(); // Misal: Pekanbaru, Riau
            
            $table->date('start_date');
            $table->date('end_date')->nullable(); // Jika null, berarti "Sekarang"
            $table->boolean('is_current')->default(false); // Penanda masih aktif bekerja
            
            // Menyimpan daftar tugas dalam bentuk poin-poin
            $table->json('achievements'); // Contoh: ["Membuat API", "Fix Bug"]
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('experiences');
    }
};
