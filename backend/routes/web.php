<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Register;
use App\Http\Controllers\addEvent;
use App\Http\Controllers\account;
use App\Http\Controllers\login;
use App\Http\Controllers\logout;
use App\Http\Controllers\deleteEvent;
use App\Http\Controllers\updateEvent;
use App\Http\Controllers\registerForEvent;



Route::get('/', function () {
    return view('welcome');
});
Route::post('/Register', [Register::class, 'register']);
Route::post('/addEvent', [addEvent::class, 'addEvent']);
Route::post('/deleteAccount', [account::class, 'deleteAccount']);
Route::post('/login', [login::class, 'login']);
Route::post('/logout', [logout::class, 'logout']);
Route::post('/deleteEvent/{eventId}', [deleteEvent::class, 'deleteEvent']);
Route::post('/updateEvent/{eventId}', [updateEvent::class, 'updateEvent']);
Route::post('/registerForEvent/{eventId}', [registerForEvent::class, 'registerForEvent']);
