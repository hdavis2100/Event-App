<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class Register extends Controller
{
    
	public function register(Request $request)
	{

		if ($request->session()->has('user_id')) {
			return response()->json([
				'message' => 'Already logged in',
				'success' => false
			]);
		}
		$data = $request->validate([
			'name' => 'required|string|max:255|unique:users,name',
			'email' => 'email|unique:users,email',
			'password' => 'required|string',
			'role' => 'required|in:planner,seeker',
		]);

		$user = User::create([
			'name' => $data['name'],
			'email' => $data['email'],
			'password' => Hash::make($data['password']),
			'role' => $data['role'],
		]);

		$request->session()->put('user_id', $user->id);


		return response()->json([
			'message' => 'User registered successfully',
			'user' => $user,
			'success' => true
		]);
		
		



	
	}
}