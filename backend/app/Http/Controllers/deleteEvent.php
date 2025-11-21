<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\User;

class deleteEvent extends Controller
{
    public function deleteEvent(Request $request, $eventId)
    {
        if (!$request->session()->has('user_id')) {
            return response()->json([
                'message' => 'Not logged in',
            ]);
        }
        $userId = $request->session()->get('user_id');

        $user = User::find($userId);
        if ($user->role !== 'planner') {
            return response()->json([
                'message' => 'Only planners can delete events',
            ]);
        }

        $event = Event::find($eventId);
        if ($event) {
            $event->delete();
            return response()->json([
                'message' => 'Event deleted successfully',
            ]);
        } else {
            return response()->json([
                'message' => 'Event not found',
            ]);
        }
    }
}
