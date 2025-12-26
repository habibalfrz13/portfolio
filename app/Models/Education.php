<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    // UBAH JADI 'educations' (SESUAIKAN DENGAN SCREENSHOT DB)
    protected $table = 'educations'; 

    protected $guarded = ['id'];
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_current' => 'boolean',
    ];
}