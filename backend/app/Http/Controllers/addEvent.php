<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\Hash;
use App\Models\User;


class addEvent extends Controller
{
    public function addEvent(Request $request)
    {

        if (!$request->session()->has('user_id')) {
            return response()->json([
                'message' => 'Not logged in',
            ]);
        }
        $id = $request->session()->get('user_id');

        if (User::find($id)->role !== 'planner') {
            return response()->json([
                'message' => 'Only planners can add events',
            ]);
        }
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after_or_equal:start_time',
            'is_private' => 'required|boolean',
            'password' => 'nullable|string|max:255',
        ]);

        $event = Event::create([
            'user_id' => $request->session()->get('user_id'),
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'location' => $data['location'] ?? null,
            'start_time' => $data['start_time'],
            'end_time' => $data['end_time'],
            'is_private' => $data['is_private'],
            'password' => $data['is_private'] ? Hash::make($data['password']) : null,
        ]);

        return response()->json([
            'message' => 'Event added successfully',
            'event' => $event,
        ]);
    }
}
