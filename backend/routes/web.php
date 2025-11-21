<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Register;
use App\Http\Controllers\addEvent;
use App\Http\Controllers\account;
use App\Http\Controllers\login;
use App\Http\Controllers\logout;


Route::get('/', function () {
    return view('welcome');
});
Route::post('/Register', [Register::class, 'register']);
Route::post('/addEvent', [addEvent::class, 'addEvent']);
Route::post('/deleteAccount', [account::class, 'deleteAccount']);
Route::post('/login', [login::class, 'login']);
Route::post('/logout', [logout::class, 'logout']);

