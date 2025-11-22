<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;

class getEvents extends Controller
{
    
    public function getEvents(Request $request){

        if (!$request->session()->has('user_id')) {
            return response()->json([
                'message' => 'Not logged in',
            ]);
        }

        $query = Event::query();
        $query->orderBy('date', 'desc');

        // Full-text search on title and description
        // Source: https://laravel-news.com/whereFullText
        if ($request->search) {

            $query->whereFullText(['title', 'description'], $request->search);
        }

        if ($request->date) {
            $query->whereDate('start_time', '=', $request->date);
        }

        $events = $query->get();
        return response()->json([
            'message' => 'Events retrieved successfully',
            'events' => $events,
        ]);
    }
}
