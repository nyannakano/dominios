<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Domain extends Model
{
    protected $table = 'domains';

    protected $fillable = [
        'name',
        'domain',
        'client',
        'active',
        'expiration_date',
        'observation',
    ];
}
