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
        // 1. Tabel Pendidikan (Formal)
        // Contoh: SMK, Universitas
        Schema::create('educations', function (Blueprint $table) {
            $table->id();
            $table->string('institution'); // Nama Sekolah/Kampus
            $table->string('degree')->nullable(); // Gelar (S1, D3, SMK)
            $table->string('major')->nullable(); // Jurusan (Teknik Informatika)
            $table->string('city')->nullable(); // Kota (Opsional)
            $table->date('start_date'); // Tanggal Mulai
            $table->date('end_date')->nullable(); // Tanggal Lulus (Null = Masih berjalan)
            $table->boolean('is_current')->default(false); // Penanda "Sampai Sekarang"
            $table->text('description')->nullable(); // Deskripsi kegiatan/prestasi/IPK
            $table->integer('sort_order')->default(0); // Buat ngatur urutan tampilan
            $table->timestamps();
        });

        // 2. Tabel Sertifikat (Resmi/BNSP/Vendor)
        // Contoh: AWS Certified, BNSP Junior Web Dev
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nama Sertifikat
            $table->string('issuer'); // Penerbit (AWS, BNSP, Dicoding)
            $table->date('issued_date'); // Tanggal Terbit
            $table->date('expiration_date')->nullable(); // Tanggal Kadaluarsa
            $table->string('credential_id')->nullable(); // ID Kredensial (biar bisa dicek validitas)
            $table->string('credential_url')->nullable(); // Link ke bukti sertifikat
            $table->timestamps();
        });

        // 3. Tabel Kelas & Pelatihan (Course/Bootcamp/Workshop)
        // Contoh: Kursus Udemy, Bootcamp Fullstack, Seminar
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Judul Kelas/Pelatihan
            $table->string('platform'); // Platform (Udemy, Coursera, Offline)
            $table->string('instructor')->nullable(); // Nama Instruktur (Opsional)
            $table->date('completed_at')->nullable(); // Tanggal Selesai
            $table->integer('duration_hours')->nullable(); // Durasi (jam) - Opsional biar keren
            $table->string('certificate_url')->nullable(); // Link sertifikat penyelesaian (jika ada)
            $table->timestamps();
        });

        // 4. Tabel Skills / Kompetensi
        // Contoh: Laravel, React, Teamwork
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nama Skill
            $table->string('category')->default('tech'); // Kategori: 'tech', 'soft-skill', 'tools', 'language'
            $table->string('icon')->nullable(); // Class icon (FontAwesome/Devicon) atau URL gambar
            $table->integer('proficiency')->default(0); // Tingkat keahlian (0-100 persen)
            $table->boolean('is_featured')->default(false); // Apakah ditampilkan di halaman depan?
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skills');
        Schema::dropIfExists('courses');
        Schema::dropIfExists('certificates');
        Schema::dropIfExists('educations');
    }
};