<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Date extends Model
{
    protected $fillable = ['reservation_date'];
    
    public function users()
    {
        return $this->belongsTo('App\User');
    }
}
