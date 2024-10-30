<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class student extends Model
{
    protected $table = 'student';
    protected $fillable = ['nama', 'nim', 'email', 'jurusan'];
    public $timestamps = false;
}
