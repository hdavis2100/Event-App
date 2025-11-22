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
use App\Http\Controllers\unregister;
use App\Http\Controllers\postEventMessage;
use App\Http\Controllers\sendPrivateMessage;
use App\Http\Controllers\getEvents;
use App\Http\Controllers\getPlannerInfo;
use App\Http\Controllers\getPrivateMessages;
use App\Http\Controllers\getSeekerInfo;
use App\Http\Controllers\getEventMessages;
use App\Http\Controllers\getEventComments;
use App\Http\Controllers\getEventRegistrations;


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
Route::post('/unregister/{eventId}', [unregister::class, 'unregister']);
Route::post('/postEventMessage/{eventId}', [postEventMessage::class, 'postMessage']);
Route::post('/sendPrivateMessage/{receiverId}', [sendPrivateMessage::class, 'sendPrivateMessage']);
Route::get('/events', [getEvents::class, 'getEvents']);
Route::get('/plannerInfo', [getPlannerInfo::class, 'getPlannerInfo']);
Route::get('/privateMessages', [getPrivateMessages::class, 'getMessages']);
Route::get('/seekerInfo', [getSeekerInfo::class, 'getInfo']);
Route::get('/eventComments/{eventId}', [getEventMessages::class, 'getComments']);
Route::get('/eventRegistrations/{eventId}', [getEventRegistrations::class, 'getRegistrations']);