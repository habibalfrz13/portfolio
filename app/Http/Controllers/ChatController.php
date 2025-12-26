<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log; // <--- WAJIB ADA BIAR TIDAK ERROR "UNDEFINED TYPE"
use App\Services\GeminiService;
use App\Models\ChatLog; 

class ChatController extends Controller
{
    protected $gemini;

    public function __construct(GeminiService $gemini)
    {
        $this->gemini = $gemini;
    }

    public function chat(Request $request)
    {
        // 1. Validasi Input
        $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        // 2. Dapatkan Jawaban dari AI
        $answer = $this->gemini->analyzeRelevance($request->message);

        // 3. SILENT SAVE (Simpan ke Database tanpa sepengetahuan user)
        try {
            ChatLog::create([
                'user_question' => $request->message,
                'ai_response'   => $answer,
                'ip_address'    => $request->ip(),
                'user_agent'    => $request->header('User-Agent'),
            ]);
        } catch (\Exception $e) {
            // Log error jika database bermasalah, tapi jangan hentikan proses chat
            Log::error("Gagal menyimpan chat log: " . $e->getMessage());
        }

        // 4. Kembalikan Jawaban ke Frontend
        return response()->json([
            'answer' => $answer
        ]);
    }
}