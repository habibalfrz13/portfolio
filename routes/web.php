<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// --- 1. HALAMAN UTAMA (Single Page Portfolio) ---
// Semua data (Projects, Experience, Sertifikat, dll) diambil di WelcomeController
Route::get('/', [WelcomeController::class, 'index'])->name('welcome');


// --- 2. API CHATBOT (Untuk Widget AI) ---
// Ini jalur komunikasi antara React (Widget) dengan Controller AI
Route::post('/ai-chat', [ChatController::class, 'chat'])->name('ai.chat');


// --- 3. AREA AUTHENTICATED (Admin/Dashboard) ---
// Jika project portfolio ini punya halaman admin sendiri (opsional)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});


// --- 4. AUTH ROUTES (Login/Logout) ---
require __DIR__.'/auth.php';