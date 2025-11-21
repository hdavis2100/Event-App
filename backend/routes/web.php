<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Register;
use App\Http\Controllers\addEvent;

Route::get('/', function () {
    return view('welcome');
});
Route::post('/Register', [Register::class, 'register']);
Route::post('/addEvent', [addEvent::class, 'addEvent']);