<?php

use App\Http\Controllers\EmployerController;
use App\Http\Controllers\JobController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiController;

// Open Routes
Route::post('/register', [ApiController::class, 'register']);
Route::post('/login', [ApiController::class, 'login']);

// Protected Routes
Route::group([
    'middleware' => ["auth:api"]
], function () {
    Route::get('/profile', [ApiController::class, 'profile']);
    Route::post('/logout', [ApiController::class, 'logout']);
});

//Other Routes
Route::apiResource('jobs', JobController::class);
Route::patch('/jobs/{id}/restore', [JobController::class, 'restore']);

Route::apiResource('employers', EmployerController::class);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');
