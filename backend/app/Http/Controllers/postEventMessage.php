<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\eventMessage;
use App\Models\Event;
use App\Models\User;

class postEventMessage extends Controller
{
    public function postMessage(Request $request, $eventId){

        if (!$request->session()->has('user_id')) {
            return response()->json([
                'message' => 'Not logged in',
            ]);
        }
        $userId = $request->session()->get('user_id');

        $message = $request->input('message');
        $eventMessage = eventMessage::create([
            'event_id' => $eventId,
            'user_id' => $userId,
            'message' => $message,
        ]);

        return response()->json([
            'message' => 'Message posted successfully',
            'eventMessage' => $eventMessage,
        ]);
    }
}
