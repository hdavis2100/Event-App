<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'location',
        'start_time',
        'end_time',
        'is_private',
        
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected function casts(): array
    {
        return [
            'start_time' => 'datetime',
            'end_time' => 'datetime',
            'is_private' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }


}
