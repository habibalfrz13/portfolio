<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $guarded = ['id'];

    // WAJIB: Biar 'achievements' dibaca sebagai Array
    protected $casts = [
        'achievements' => 'array',
        'start_date' => 'date',
        'end_date' => 'date',
        'is_current' => 'boolean',
    ];
}