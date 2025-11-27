<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\User;

class getEvents extends Controller
{
    
    public function getEvents(Request $request){

        if (!$request->session()->has('user_id')) {
            return response()->json([
                'message' => 'Not logged in',
                'success' => false
            ]);
        }

        $query = Event::query();
        $query->orderBy('start_time', 'desc');

        // Full-text search on title and description
        // Source: https://laravel-news.com/whereFullText
        if ($request->search) {

            $query->whereFullText(['title', 'description'], $request->search);
        }

        if ($request->date) {
            $query->whereDate('start_time', '=', $request->date);
        }

        $events = $query->get();
        foreach ($events as $event) {
            $event->planner = User::find($event->user_id);
        }


        return response()->json([
            'message' => 'Events retrieved successfully',
            'events' => $events,
            'success' => true
        ]);
    }
}
