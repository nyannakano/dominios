<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DomainController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/domains', [DomainController::class, 'getDomains']);
Route::get('/domain/{id}', [DomainController::class, 'getDomain']);
Route::post('/domain-create', [DomainController::class, 'createDomain']);
Route::delete('/domain-delete/{id}', [DomainController::class, 'deleteDomain']);
Route::put('/domain-update/{id}', [DomainController::class, 'updateDomain']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
