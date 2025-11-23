<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;

class getPlannerInfo extends Controller
{
    
    public function getPlannerInfo(Request $request){

        if (!$request->session()->has('user_id')) {
            return response()->json([
                'message' => 'Not logged in',
                'success' => false
            ]);
        }

        $events = $this->getPlannerEvents($request);

        // Other info tbd

        return response()->json([
            'message' => 'Planner info retrieved successfully',
            'events' => $events,
            'success' => true
        ]);
    }

    private function getPlannerEvents(Request $request){
        
        $userId = $request->session()->get('user_id');
        $events = Event::where('user_id', $userId)->orderBy('created_at', 'desc')->get();
        return $events; 
        
    }

}

