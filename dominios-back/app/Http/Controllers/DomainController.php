<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateDomainRequest;
use App\Services\DomainService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DomainController extends Controller
{
    private DomainService $domainService;

    public function __construct(DomainService $domainService)
    {
        $this->domainService = $domainService;
    }

    public function getDomains(): JsonResponse
    {
        $domains = $this->domainService->getDomains();

        return response()->json(['message' => 'Domínios encontrados com sucesso', 'domains' => $domains]);
    }

    public function getDomain($id): JsonResponse
    {
        $domain = $this->domainService->getDomain($id);

        if ($domain === null) {
            return response()->json(['message' => 'Domínio nao encontrado'], 404);
        }

        return response()->json(['message' => 'Domínio encontrado com sucesso', 'domain' =>  $domain]);
    }

    public function createDomain(CreateDomainRequest $request): JsonResponse
    {
        $domain = $this->domainService->createDomain($request);

        if ($domain['status']) {
            return response()->json(['message' => $domain['message'], 'domain' => $domain['domain']], 201);
        }

        return response()->json(['message' => $domain['message']], 400);
    }

    public function deleteDomain($id): JsonResponse
    {
        $response = $this->domainService->deleteDomain($id);

        if ($response['status']) {
            return response()->json(['message' => $response['message']], 200);
        }

        return response()->json(['message' => $response['message']], 400);
    }

    public function updateDomain($id, CreateDomainRequest $request): JsonResponse
    {
        $response = $this->domainService->updateDomain($id, $request);

        if ($response['status']) {
            return response()->json(['message' => $response['message']], 200);
        }

        return response()->json([$response['message']], 400);
    }

}
