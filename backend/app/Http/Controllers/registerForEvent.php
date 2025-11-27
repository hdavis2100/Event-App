<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Models\Registration;


class registerForEvent extends Controller
{
    
    public function registerForEvent(Request $request, $eventId)
    {
        if (!$request->session()->has('user_id')) {
            return response()->json([
                'message' => 'Not logged in',
                'success' => false
            ]);
        }
        $userId = $request->session()->get('user_id');
        $user = User::find($userId);
        if (!$user || $user->role !== 'seeker') {
            return response()->json([
                'message' => 'Only seekers can register for events',
                'success' => false,
            ]);
        }

        

        $event = Event::find($eventId);
        if (!$event) {
            return response()->json([
                'message' => 'Event not found',
                'success' => false,
            ]);
        }

        if ($event->is_private) {

            if (!$request->filled('password')) {
                return response()->json([
                    'message' => 'Password is required for private events',
                    'success' => false,
                ]);
            }

            if (!$request->filled('password')) {
                return response()->json([
                    'message' => 'Password is required for private events',
                    'success' => false,
                ]);
            }

            $password = $request->password;
            if (!Hash::check($password, $event->password)) {
                return response()->json([
                    'message' => 'Incorrect password for private event',
                    'success' => false,
                ]);
            }
        }

        $alreadyRegistered = Registration::where('user_id', $userId)->where('event_id', $eventId)->exists();
        if ($alreadyRegistered) {
            return response()->json([
                'message' => 'Already registered for this event',
                'success' => true,
            ]);
        }
        
        $registration = Registration::create([
            'user_id' => $userId,
            'event_id' => $eventId,
        ]);

        return response()->json([
            'message' => 'Registered for event successfully',
            'registration' => $registration,
            'success' => true
        ]);
    }
}
