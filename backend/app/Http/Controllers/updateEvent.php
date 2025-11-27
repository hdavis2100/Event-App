<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

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
        if ($event->user_id !== $id) {
            return response()->json([
                'message' => 'You can only update your own events',
                'success' => false
            ]);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'location' => 'sometimes|required|string|max:255',
            'start_time' => 'sometimes|required|date',
            'end_time' => 'sometimes|required|date|after_or_equal:start_time',
            'is_private' => 'sometimes|required|boolean',
            'password' => 'sometimes|required_if:is_private,true|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
                'success' => false
            ]);
        }

        $data = $validator->validated();
        if (isset($data['is_private']) && $data['is_private']) {
            if (isset($data['password'])) {
                $data['password'] = Hash::make($data['password']);
            } else {
                return response()->json([
                    'message' => 'Password is required for private events',
                    'success' => false
                ]);
            }
        } else {
            $data['password'] = null;
        }

        $event->update($data);

        return response()->json([
            'message' => 'Event updated successfully',
            'event' => $event,
            'success' => true
        ]);
    }

}
