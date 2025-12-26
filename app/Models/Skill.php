<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'is_featured' => 'boolean', // Penting buat toggle
        'proficiency' => 'integer',
    ];
}