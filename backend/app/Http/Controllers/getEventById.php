<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\User;
class getEventById extends Controller
{
    public function getEventById(Request $request, $eventId){
        
   
        if (!$request->session()->has('user_id')) { 
            return response()->json([
                'message' => 'Not logged in',
                'success' => false
        ]);
        }

        $event = Event::find($eventId);
        if (!$event) {
            return response()->json([
                'message' => 'Event not found',
                'success' => false
            ]);
        }
        if ($event->is_private && !Hash::check($request->password, $event->password)) {
            
            return response()->json([
                'success'=>false,
                'message'=>'Password required'
            ]);
        }

        return response()->json([
            'message' => 'Event retrieved successfully',
            'event' => $event,
            'success' => true
        ]);
    }
}