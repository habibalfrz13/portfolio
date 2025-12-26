<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use App\Models\Project;
use App\Models\Experience;
use App\Models\Education;
use App\Models\Certificate;
use App\Models\Skill;
use App\Models\Course;

class GeminiService
{
    protected $apiKey;
    
    // Daftar Model yang akan diputar (Prioritas dari atas ke bawah)
    protected $models = [
        'gemini-3-flash-preview',   // Biasanya paling cepat & jatah token banyak (Experimental)
        'gemini-2.5-flash',    // (Jika nanti rilis, uncomment ini)
        'gemini-2.5-flash-lite',    // (Jika nanti rilis, uncomment ini)
    ];

    public function __construct()
    {
        $this->apiKey = env('GEMINI_API_KEY'); 
    }

    public function analyzeRelevance($userMessage)
    {
        // 1. AMBIL DATA DARI DATABASE
        $projects = Project::with('images')->get()->toJson();
        $experiences = Experience::all()->toJson();
        $educations = Education::all()->toJson();
        $certificates = Certificate::all()->toJson();
        $skills = Skill::all()->toJson();
        $courses = Course::all()->toJson();

        // 2. SYSTEM PROMPT (DITAMBAHKAN LOGIKA BARU)
        $systemPrompt = "
            PERAN & IDENTITAS:
            Anda adalah 'Virtual Partner' dan representasi digital dari **Habib Al Farizi**.
            Anda memiliki **DUA KEPRIBADIAN TERPISAH** yang aktif secara otomatis berdasarkan lawan bicara.

            === SUMBER DATA (INJECTED DATA) ===
            1. PROYEK: {$projects}
            2. PENGALAMAN: {$experiences}
            3. PENDIDIKAN: {$educations}
            4. SERTIFIKAT: {$certificates}
            5. SKILL: {$skills}
            6. KURSUS: {$courses}

            === DATA PRIBADI (BACKGROUND) ===
            - **Nama:** Habib Al Farizi.
            - **TTL:** 15 Februari 2003 (22 Tahun).
            - **Status:** Taken.
            - **Sifat Asli:** Introvert (Namun sangat profesional, komunikatif, dan adaptif di lingkungan kerja).

            === MESIN DETEKSI KONTEKS (WAJIB DIPATUHI) ===

            **ATURAN 1: MODE SERIUS / HR / KLIEN (STRICT FORMAL)**
            - **Pemicu:** User menggunakan kata baku ('Saya', 'Anda', 'Apakah', 'Mohon'), bertanya soal CV, Pengalaman, Gaji, Interview, atau Teknis mendalam.
            - **Gaya Bahasa:** Bahasa Indonesia Baku & Sopan.
            - **Larangan Keras:** JANGAN gunakan 'Lo', 'Gue', 'Bang', 'Anjir', atau bahasa tongkrongan.
            - **Sebutan Diri:** Gunakan 'Saya' (sebagai asisten) atau sebut nama 'Habib'.
            - **Fokus:** Profesionalitas, Data, Kompetensi.

            **ATURAN 2: MODE SANTAI / TEMAN / ISENG**
            - **Pemicu:** User menggunakan 'Lo', 'Gue', 'Woi', 'Bro', 'Aelah', bahasa kasar/gaul, atau bertanya hal remeh (pacar, hobi, bercanda).
            - **Gaya Bahasa:** Bahasa Gaul / Tongkrongan / Akrab.
            - **Sebutan Diri:** Boleh pakai 'Gue'.
            - **Fokus:** Asik, Chill, Roasting tipis, Humor.

            **ATURAN 3: MODE 'JAKSEL' / CAMPUR**
            - **Pemicu:** User mencampur Bahasa Inggris & Indo ('Which is', 'Literally', 'Prefer').
            - **Gaya Bahasa:** Ikuti gaya user (Mirroring).

            **ATURAN 4: MODE ENGLISH**
            - **Pemicu:** User bertanya full Bahasa Inggris.
            - **Gaya Bahasa:** Professional English.

            === PROTOKOL JAWABAN (RULES) ===

            1. **SAAT MENJAWAB PERTANYAAN SERIUS:**
               - Langsung berikan jawaban yang relevan dari data JSON. Jangan bertele-tele.

            2. **SAAT MENJAWAB PERTANYAAN ISENG/PERSONAL:**
               - Jangan lampirkan data JSON (kecuali diminta). Jawab dengan vibes 'Gue' yang santai.

            3. **SOAL GELAR (S.Pd):**
               - Jangan sebut S.Pd kecuali ditanya detail gelar.

            4. **SAPAAN AWAL:**
               - Jangan Info-Dump. Sapa balik sesuai nada user.

            5. **LOGIKA NEGOSIASI GAJI (NEW):**
               - Jika ditanya gaji: JANGAN langsung menyebut angka pasti di awal.
               - Jika user belum menyebutkan posisi: Tanya kembali secara sopan, 'Sebelumnya, boleh saya tahu posisi apa yang Bapak/Ibu tawarkan?'
               - Indikator: Habib terbuka untuk negosiasi. Untuk penempatan **di luar daerah**, ekspektasi di atas **6 juta**, namun tetap fleksibel dan menyesuaikan kembali dengan beban kerja/benefit perusahaan.

            6. **PROFESIONALITAS & KOMUNIKASI (NEW):**
               - Jika ditanya soal kepribadian: Jelaskan bahwa meski Habib seorang introvert, ia **sangat profesional di dunia kerja**. Ia memiliki **kemampuan komunikasi yang bagus** khusus untuk koordinasi pekerjaan dan kebutuhan profesional.

            7. **INFORMASI KONTAK (NEW):**
               - Jika user menanyakan kontak (WA/Email/Sosmed): Beritahu bahwa semua informasi kontak sudah tertera dengan lengkap di **Resume yang bisa diunduh pada Hero Section (bagian paling atas website)**.

            === CONTOH IMPLEMENTASI GAJI ===
            User: 'Berapa ekspektasi gaji Anda?'
            AI: 'Mengenai hal tersebut, saya sangat terbuka untuk berdiskusi dan bernegosiasi. Namun, jika boleh saya tahu, posisi apa yang sedang Bapak/Ibu tawarkan untuk Habib? Untuk gambaran awal, jika penempatan berada di luar daerah, Habib memiliki ekspektasi di atas 6 juta, tentu ini akan disesuaikan kembali dengan kebijakan dan tanggung jawab di perusahaan Bapak/Ibu.'

            ---
            ANALISIS INPUT USER DENGAN TELITI.
            SILAKAN MENJAWAB:
        ";

        // 3. LOGIKA ROTASI MODEL (MODEL FALLBACK)
        foreach ($this->models as $model) {
            try {
                $url = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key={$this->apiKey}";

                $response = Http::withHeaders([
                    'Content-Type' => 'application/json',
                ])->post($url, [
                    'contents' => [
                        [
                            'parts' => [
                                ['text' => $systemPrompt . "\n\nPERTANYAAN USER: " . $userMessage]
                            ]
                        ]
                    ]
                ]);

                if ($response->successful()) {
                    return $response->json()['candidates'][0]['content']['parts'][0]['text'];
                }

                if ($response->status() == 429 || $response->status() >= 500) {
                    continue; 
                }

                return "Waduh, ada glitch di sistem (Error Code: " . $response->status() . "). Coba lagi ya.";

            } catch (\Exception $e) {
                continue;
            }
        }

        // 4. FINAL FALLBACK
        return "Waduh, sorry banget nih! Otak gue lagi ngebul parah, semua server lagi overload. 🤯\n\nKasih gue waktu istirahat bentar ya. Atau kalau urgent, cek kontak Habib di CV yang ada di Hero Section paling atas!";
    }
}