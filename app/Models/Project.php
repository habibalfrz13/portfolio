<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $guarded = ['id'];

    // WAJIB: Biar 'tech_stack' dibaca sebagai Array, bukan String
    protected $casts = [
        'tech_stack' => 'array',
    ];

    public function images()
    {
        return $this->hasMany(ProjectImage::class);
    }
}