<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\privateMessage;
use App\Models\User;

class getPrivateMessagesWithUser extends Controller
{
    public function getMessagesWithUser(Request $request, $otherUserId){
        
   
        if (!$request->session()->has('user_id')) { 
            return response()->json([
                'message' => 'Not logged in',
                'success' => false
        ]);
        }

        $userId = $request->session()->get('user_id');
        $sentMessages = privateMessage::where('sender_id', $userId)->where('receiver_id', $otherUserId);
        $receivedMessages = privateMessage::where('sender_id', $otherUserId)->where('receiver_id', $userId);
        $privateMessages = $sentMessages->union($receivedMessages)->orderBy('created_at', 'desc')->get();
        $otherUser = User::find($otherUserId);
        return response()->json([
            'message' => 'Private messages with user retrieved successfully',
            'privateMessages' => $privateMessages,
            'otherUser' => $otherUser,
            'success' => true,
        ]);
    }
}