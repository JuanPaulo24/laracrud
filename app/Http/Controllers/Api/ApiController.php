<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
class ApiController extends Controller
{
    //POST [first_name, last_name, email, password]
    public function register(Request $request)
    {
        //Validation
        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|string|min:8'
        ]);

        //Create User
        User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);
        return response()->json([
            "status" => true,
            'message' => 'User created successfully',
            "data" => []
        ]);
    }

    //POST [email, password]
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email|string',
            'password' => 'required'
        ]);

        //User object
        $user = User::where('email', $request->email)->first();

        if(!empty($user)){
            //User Exists
            if(Hash::check($request->password, $user->password)) {
                //Password Matches
                $token = $user->createToken('mytoken')->accessToken;

                return response()->json([
                    ":status" => true,
                    'message' => 'Login Successful',
                    "token" => $token,
                    "data" => []
                ]);
            }else{
                return response()->json([
                    "status" => false,
                    'message' => "Sorry, Password didn't match",
                    "data" => [],
                ]);
            }
        }else{
            //User does not exist
            return response()->json([
                "status" => false,
                'message' => 'Invalid Email Value',
                "data" => []
            ]);
        }

    }

    //GET [Auth: Token]
    public function profile()
    {
        $userData = auth()->user();

        return response()->json([
            "status" => true,
            'message' => 'Profile Information',
            "data" => $userData,
            "id" => auth()->user()->id
        ]);
    }

    //GET [Auth: Logout]
    public function logout(Request $request)
    {
        $token = auth()->user()->token();
        $token->revoke();

        return response()->json([
            "status" => true,
            'message' => 'User Logged out successfully',
            "data" => []
        ]);
    }
}
