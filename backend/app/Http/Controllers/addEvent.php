<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Validator;


class addEvent extends Controller
{
    public function addEvent(Request $request)
    {

        if (!$request->session()->has('user_id')) {
            return response()->json([
                'message' => 'Not logged in',
                'success' => false
            ]);
        }
        $id = $request->session()->get('user_id');

        if (User::find($id)->role !== 'planner') {
            return response()->json([
                'message' => 'Only planners can add events',
                'success' => false
            ]);
        }
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'location' => 'required|string|max:255',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after_or_equal:start_time',
            'is_private' => 'required|boolean',
            'password' => 'required_if:is_private,true|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
                'success' => false
            ]);
        }

        $data = $validator->validated();

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
            'success' => true
        ]);
    }
}
