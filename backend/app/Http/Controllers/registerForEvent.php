<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


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

        $password = $request->password;

        $event = Event::find($eventId);
        if ($event->is_private) {
            if (!hash::check($password, $event->password)) {
                return response()->json([
                    'message' => 'Incorrect password for private event',
                    'success' => false
                ]);
            }
        }

        $registration = Registration::create([
            'user_id' => $userId,
            'event_id' => $eventId,
        ]);

        if ($user->role !== 'seeker') {
            return response()->json([
                'message' => 'Only seekers can register for events',
                'success' => false
            ]);
        }

        return response()->json([
            'message' => 'Registered for event successfully',
            'registration' => $registration,
            'success' => true
        ]);
    }
}
