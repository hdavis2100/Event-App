<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Registration;
use App\Models\Event;
use App\Models\User;

class getSeekerInfo extends Controller
{
    
    public function getInfo(Request $request){
        if (!$request->session()->has('user_id')) {
            return response()->json([
                'message' => 'Not logged in',
                'success' => false
            ]);
        }
        $registeredEvents = $this->getRegisteredEvents($request);
        // Other info tbd

        return response()->json([
            'message' => 'Seeker info retrieved successfully',
            'registeredEvents' => $registeredEvents,
            'success' => true
        ]);
    }

    private function getRegisteredEvents(Request $request){
        
        $userId = $request->session()->get('user_id');
        $registrations = Registration::where('user_id', $userId)->orderBy('created_at', 'desc')->get();
        
        foreach ($registrations as $registration){
            $event = Event::find($registration->event_id);
            $registration->event_details = $event;
            $planner = User::find($event->planner_id);
            $registration->planner = $planner;
        }

        return $registrations;

    }
}
