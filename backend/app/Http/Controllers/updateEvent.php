<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\User;

class updateEvent extends Controller
{
    public function updateEvent(Request $request, $eventId)
    {
        if (!$request->session()->has('user_id')) {
            return response()->json([
                'message' => 'Not logged in',
                'success' => false
            ]);
        }
        $id = $request->session()->get('user_id');
        $user = User::find($id);
        
        if ($user->role !== 'planner') {
            return response()->json([
                'message' => 'Only planners can update events',
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

        $data = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'date' => 'sometimes|required|date',
            'location' => 'sometimes|nullable|string|max:255',
            'start_time' => 'sometimes|required|date',
            'end_time' => 'sometimes|required|date|after_or_equal:start_time',
            'is_private' => 'sometimes|required|boolean',
            'password' => 'sometimes|nullable|string|max:255',
        ]);

        $event->update($data);

        return response()->json([
            'message' => 'Event updated successfully',
            'event' => $event,
            'success' => true
        ]);
    }

}
