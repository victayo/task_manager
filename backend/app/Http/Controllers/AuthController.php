<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

/**
 * A controller for authentication
 */
class AuthController extends Controller
{
    private const TOKEN = 'auth-token';
    /**
     * Performs the login request
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $token = Auth::user()->createToken(self::TOKEN)->plainTextToken;

            return response()->json(['token' => $token], 200);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function logout()
    {
        $user = Auth::user();

        $user->tokens()->where('name', self::TOKEN)->delete();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
