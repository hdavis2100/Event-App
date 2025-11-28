<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Registration;
use App\Models\User;

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
            $user_id = $registration->user_id;
            $registration->user = User::find($user_id);
        } 

        return response()->json([
            'message' => 'Event registrations retrieved successfully',
            'registrations' => $registrations,
            'success' => true
        ]);
    }
}
