<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\eventMessage;
use App\Models\Event;
use App\Models\User;

class sendPrivateMessage extends Controller
{
    public function sendPrivateMessage(Request $request, $receiverId){

        if (!$request->session()->has('user_id')) {
            return response()->json([
                'message' => 'Not logged in',
            ]);
        }
        $senderId = $request->session()->get('user_id');

        $message = $request->input('message');
        $privateMessage = privateMessage::create([
            'sender_id' => $senderId,
            'receiver_id' => $receiverId,
            'message' => $message,
        ]);

        return response()->json([
            'message' => 'Private message sent successfully',
            'privateMessage' => $privateMessage,
        ]);
    }
}
