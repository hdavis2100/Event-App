<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\eventMessage;
use App\Models\Event;
use App\Models\User;

class getEventComments extends Controller
{
    public function getComments(Request $request, $eventId){
        
   
        if (!$request->session()->has('user_id')) {
            return response()->json([
                'message' => 'Not logged in',
                'success' => false
            ]);


        }

        $eventComments = eventMessage::where('event_id', $eventId)->orderBy('created_at', 'desc')->get();

        foreach ($eventComments as $comment) {
            $user = User::find($comment->user_id);
            $comment->user = $user;
        }
        return response()->json([
            'message' => 'Event comments retrieved successfully',
            'eventComments' => $eventComments,
            'success' => true
        ]);
    }
}
