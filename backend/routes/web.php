<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Register;

Route::get('/', function () {
    return view('welcome');
});
Route::post('/Register', [Register::class, 'register']);