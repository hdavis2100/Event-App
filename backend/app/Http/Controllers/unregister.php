<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Registration;
use App\Models\Event;
use App\Models\User;

class unregister extends Controller
{
    public function unregister(Request $request, $eventId){
        if (!$request->session()->has('user_id')) {
            return response()->json([
                'message' => 'Not logged in',
            ]);
        }
        $userId = $request->session()->get('user_id');

        
        $registration = Registration::where('event_id', $eventId)->where('user_id', $userId)->first();
        if (!$registration) {
            return response()->json([
                'message' => 'Registration not found',
            ]);
        }
        $registration->delete();


        return response()->json([
            'message' => 'Unregistered from event successfully',
        ]);
    }
}
