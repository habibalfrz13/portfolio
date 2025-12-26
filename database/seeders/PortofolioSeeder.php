<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\Experience;
use Illuminate\Support\Str;

class PortofolioSeeder extends Seeder
{
    public function run(): void
    {
        // ==========================================
        // 1. DATA PENGALAMAN (EXPERIENCES)
        // ==========================================
        
        // Magang 1: Argenesia (Software House)
        Experience::create([
            'company' => 'PT ARG SOLUSI TEKNOLOGI (ARGENESIA)',
            'role' => 'Fullstack Developer Intern',
            'location' => 'Pekanbaru', // Asumsi lokasi
            'start_date' => '2023-01-01',
            'end_date' => '2023-06-30',
            'is_current' => false,
            'achievements' => [
                'Membangun rancangan sistem Marketplace Jasa Service (Tuser).',
                'Mengimplementasikan logika bisnis kompleks untuk sistem Poin dan Top-up saldo user.',
                'Mengembangkan fitur tracking lokasi dan integrasi QR Code untuk pembayaran.',
                'Belajar beradaptasi dengan deadline ketat di lingkungan Software House.'
            ],
        ]);

        // Magang 2: RSIA Andini (Sekarang)
        Experience::create([
            'company' => 'RSIA ANDINI (PT ANDINI MEDIKA)',
            'role' => 'Programmer & IT Support',
            'location' => 'Pekanbaru',
            'start_date' => '2024-10-01', // Mulai Okt
            'end_date' => '2025-04-30', // Sampai April
            'is_current' => true,
            'achievements' => [
                'Mengembangkan "Support Center SIMRS" untuk efisiensi laporan rumah sakit.',
                'Melakukan Database Re-engineering dan analisis pada struktur data non-normalized (N1/N2).',
                'Mengoptimalkan Big Query untuk laporan keuangan dan rekam medis.',
                'Membangun sistem perhitungan Jasa Medis Dokter yang dinamis dengan variabel asuransi yang kompleks.',
                'IT Support harian untuk troubleshooting hardware dan software.'
            ],
        ]);

        // ==========================================
        // 2. DATA PROYEK (PROJECTS)
        // ==========================================

        // Proyek A: Support Center SIMRS
        $simrs = Project::create([
            'title' => 'Support Center SIMRS & Jasa Medis Calculator',
            'slug' => 'support-center-simrs',
            'description' => 'Aplikasi web pendukung SIMRS utama untuk menangani pelaporan yang tidak terakomodasi oleh sistem vendor. Fokus utama pada efisiensi penarikan data laporan keuangan, resep, dan perhitungan gaji dokter (Jasa Medis) yang sangat bervariasi.',
            'tech_stack' => ['Laravel', 'MySQL (Complex Query)', 'Bootstrap', 'Data Analysis'],
            'problem_solved' => 'Struktur database lama yang tidak ternormalisasi (N1/N2) membuat penarikan laporan menjadi sangat lambat dan sering error. Perhitungan jasa medis sebelumnya dilakukan semi-manual dan rawan selisih.',
            'impact' => 'Mengotomatisasi perhitungan jasa medis dokter dengan akurasi tinggi dan memotong waktu pembuatan laporan bulanan secara signifikan melalui optimasi query database.',
            'github_link' => null, // Isi jika ada atau null
        ]);
        
        // Foto Proyek SIMRS (Pastikan file ada di storage/app/public/projects/)
        $simrs->images()->createMany([
            ['image_path' => 'projects/simrs-dashboard.png', 'caption' => 'Dashboard monitoring resep dan laporan harian'],
            ['image_path' => 'projects/simrs-jasmed.png', 'caption' => 'Modul perhitungan Jasa Medis Dokter dinamis'],
        ]);


        // Proyek B: Sewaka (Marketplace Konveksi)
        $sewaka = Project::create([
            'title' => 'Sewaka - Marketplace Custom Clothing B2B/B2C',
            'slug' => 'sewaka-marketplace',
            'description' => 'Platform marketplace yang menghubungkan penjahit/konveksi dengan pelanggan yang membutuhkan baju custom, seragam sekolah, atau pesanan borongan. Dilengkapi fitur negosiasi dan formulir pengukuran digital.',
            'tech_stack' => ['Laravel', 'Midtrans API', 'MySQL', 'Javascript'],
            'problem_solved' => 'Kesulitan pelanggan mencari vendor konveksi terpercaya untuk pesanan borongan. Penjahit sering kehilangan data ukuran pelanggan karena masih mencatat di kertas.',
            'impact' => 'Mendigitalisasi proses pengukuran badan (body measurement form) sehingga data tersimpan aman. Mempermudah transaksi dengan Payment Gateway Midtrans.',
            'github_link' => 'https://github.com/habib/sewaka', // Contoh
        ]);

        $sewaka->images()->createMany([
            ['image_path' => 'projects/sewaka-home.png', 'caption' => 'Halaman depan marketplace Sewaka'],
            ['image_path' => 'projects/sewaka-measurement.png', 'caption' => 'Fitur Input Ukuran Badan Digital (Tanpa Kertas)'],
        ]);


        // Proyek C: SPK Pemilihan Mata Pelajaran (Tugas Akhir)
        $dss = Project::create([
            'title' => 'DSS Pemilihan Mata Pelajaran SMA (TOPSIS)',
            'slug' => 'dss-topsis-sma',
            'description' => 'Sistem Pendukung Keputusan (SPK) untuk membantu siswa SMA memilih mata pelajaran peminatan yang sesuai dengan potensi mereka menggunakan metode TOPSIS.',
            'tech_stack' => ['Laravel', 'TOPSIS Algorithm', 'RIASEC Test', 'MySQL'],
            'problem_solved' => 'Banyak siswa salah mengambil peminatan karena hanya ikut-ikutan teman tanpa melihat nilai akademik dan minat bakat.',
            'impact' => 'Memberikan rekomendasi saintifik berbasis data nilai, tes minat bakat (RIASEC), dan peluang karir.',
            'github_link' => 'https://github.com/habib/spk-topsis', 
        ]);

        $dss->images()->createMany([
            ['image_path' => 'projects/dss-result.png', 'caption' => 'Hasil perangkingan rekomendasi mata pelajaran'],
            ['image_path' => 'projects/dss-riasec.png', 'caption' => 'Modul Tes Minat Bakat RIASEC'],
        ]);


        // Proyek D: Tuser (Prototype)
        $tuser = Project::create([
            'title' => 'Tuser (Tukang Service) Marketplace',
            'slug' => 'tuser-marketplace',
            'description' => 'Prototipe marketplace pencari jasa servis elektronik terdekat. Memiliki logika bisnis unik di mana teknisi harus menggunakan sistem poin (Top Up) untuk mendapatkan akses ke order pelanggan.',
            'tech_stack' => ['Laravel', 'Geolocation', 'Payment Logic'],
            'problem_solved' => 'Sulitnya mencari tukang servis panggilan yang valid di sekitar lokasi pengguna.',
            'impact' => 'Mengembangkan logika sistem poin dan top-up saldo sebagai model monetisasi platform.',
            'github_link' => null,
        ]);

        // Tidak ada gambar untuk Tuser (opsional) atau pasang placeholder
    }
}