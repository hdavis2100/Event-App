<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class login extends Controller
{
    
    public function login(Request $request){

        if ($request->session()->has('user_id')) {
            return response()->json([
                'message' => 'Already logged in',
                'success' => false
            ]);
        }
        $data = $request->validate([

            'name' => 'required|string|max:255',
            'password' => 'required|string',
        ]);

        $user = User::where('name', $data['name'])->first();
        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials',
                'success' => false
            ]);
        }
        $request->session()->put('user_id', $user->id);
        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            'success' => true
        ]);

    }
}
