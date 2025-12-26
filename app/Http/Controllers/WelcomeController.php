<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Panggil Model
use App\Models\Project;
use App\Models\Experience;
use App\Models\Education;
use App\Models\Certificate;
use App\Models\Skill;
use App\Models\Course;

class WelcomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            
            // --- DATA DINAMIS ---
            'projects' => Project::with('images')->latest()->get(),
            'experiences' => Experience::orderBy('start_date', 'desc')->get(),
            'educations' => Education::orderBy('start_date', 'desc')->get(),
            'certificates' => Certificate::orderBy('issued_date', 'desc')->get(),
            'courses' => Course::orderBy('completed_at', 'desc')->get(),
            'skills' => Skill::all()->groupBy('category'),
        ]);
    }
}