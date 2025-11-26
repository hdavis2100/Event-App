<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\privateMessage;
use App\Models\User;

class getPrivateMessages extends Controller
{
    public function getMessages(Request $request){
        
   
        if (!$request->session()->has('user_id')) {
            return response()->json([
                'message' => 'Not logged in',
                'success' => false
            ]); 

        }

        $userId = $request->session()->get('user_id');
        $privateMessages = privateMessage::where('sender_id', $userId)->orWhere('receiver_id', $userId)->orderBy('created_at', 'desc')->get();
        return response()->json([
            'message' => 'Private messages retrieved successfully',
            'privateMessages' => $privateMessages,
            'success' => true,
        ]);
    }

            
}

