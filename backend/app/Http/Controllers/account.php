<?php

namespace App\Http\Controllers;
use App\Models\User;

use Illuminate\Http\Request;

class account extends Controller
{
    public function deleteAccount(Request $request){
        if (!$request->session()->has('user_id')){
            
            return response()->json([
                'message' => 'Not logged in',
            ]);
        }
        $userId = $request->session()->get('user_id');
        
        $user = User::find($userId);
        
        if ($user) {
            $user->delete();
            $request->session()->forget('user_id');
            
            return response()->json([
                'message' => 'Account deleted successfully',
            ]);
        } 
        
        else{
            return response()->json([
                'message' => 'User not found',
            ]);
        }
    }
}
