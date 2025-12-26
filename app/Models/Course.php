<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'completed_at' => 'date',
    ];
}