<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Registration;

class getEventRegistrations extends Controller
{
    public function getRegistrations(Request $request, $eventId){
        
        if (!$request->session()->has('user_id')) {
            return response()->json([
                'message' => 'Not logged in',
                'success' => false
            ]);
        }

        
        $registrations = Registration::where('event_id', $eventId)->get();

        foreach ($registrations as $registration) {
            $user = $registration->user;
            $registration->user = $user;
        } 

        return response()->json([
            'message' => 'Event registrations retrieved successfully',
            'registrations' => $registrations,
            'success' => true
        ]);
    }
}
