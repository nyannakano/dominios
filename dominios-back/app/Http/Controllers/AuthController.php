<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    private AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(Request $request): JsonResponse
    {
        $response = $this->authService->login($request->email, $request->password);

        if ($response) {
            return response()->json([
                'user' => $response['user'],
                'token' => $response['token']
            ]);
        }

        return response()->json([
            'error' => 'Credenciais Inválidas'
        ], 401);
    }

    public function logout(Request $request): JsonResponse
    {
        $response = $this->authService->logout($request);

        if ($response) {
            return response()->json([
                'message' => 'Logout realizado com sucesso'
            ]);
        }

        return response()->json([
            'error' => 'Logout falhou'
        ], 401);
    }
}
