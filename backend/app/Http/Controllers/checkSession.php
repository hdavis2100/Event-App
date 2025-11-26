<?php

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
class checkSession extends Controller
{
    public function checkSession(Request $request)
    {
        if ($request->session()->has('user_id')) {
            $userId = $request->session()->get('user_id');
            $user = User::find($userId);

            if ($user) {
                return response()->json([
                    'message' => 'User is logged in',
                    'success' => true,
                    'user' => $user
                ]);
            }
        }

        return response()->json([
            'message' => 'Not logged in',
            'success' => false,
        ]);
    }
}
