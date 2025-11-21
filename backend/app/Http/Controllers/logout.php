<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class logout extends Controller
{
    public function logout(Request $request){
        if (!$request->session()->has('user_id')) {
            return response()->json([
                'message' => 'Not logged in',
            ]);
        }
        $request->session()->forget('user_id');
        return response()->json([
            'message' => 'Logout successful',
        ]);
    }
}
