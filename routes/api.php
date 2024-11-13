<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PegawaiController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/employees', [PegawaiController::class, 'index']);
Route::post('/employees', [PegawaiController::class, 'store']);
Route::put('/employees/{id}', [PegawaiController::class, 'update']);
Route::delete('/employees/{id}', [PegawaiController::class, 'destroy']);
Route::get('/employees/{id}', [PegawaiController::class, 'show']);
Route::get('/employees/search', [PegawaiController::class, 'search']);
Route::get('/employees/active', [PegawaiController::class, 'active']);
Route::get('/employees/inactive', [PegawaiController::class, 'inactive']);
Route::get('/employees/terminated', [PegawaiController::class, 'terminated']);
