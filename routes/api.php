<?php

use App\Http\Controllers\EmployerController;
use App\Http\Controllers\JobController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('jobs', JobController::class);
Route::patch('/jo bs/{id}/restore', [JobController::class, 'restore']);

Route::apiResource('employers', EmployerController::class);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
