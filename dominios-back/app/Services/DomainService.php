<?php

namespace App\Services;

use App\Models\Domain;
use Illuminate\Support\Facades\Log;

class DomainService
{
    public function getDomains()
    {
        return Domain::all();
    }

    public function getDomain($id)
    {
        try {
            return Domain::find($id);
        } catch (\Exception $e) {
            Log::error('Error getting domain: ' . $e->getMessage(), [$e]);

            return null;
        }
    }

    public function createDomain($request)
    {
        try {
            $domain = Domain::create([
                'name' => $request->name,
                'domain' => $request->domain,
                'observation' => $request->observation,
                "client" => $request->client,
                'active' => $request->active,
                'expiration_date' => $request->expiration_date
            ]);

            return [
                'domain' => $domain,
                'status' => true,
                'message' => 'Domínio criado com sucesso'
            ];
        } catch (\Exception $e) {
            Log::error('Error creating domain: ' . $e->getMessage(), [$e]);

            return [
                'message' => 'Ocorreu um erro ao criar o domínio',
                'status' => false
            ];
        }
    }

    public function deleteDomain($id)
    {
        $domain = Domain::find($id);

        if ($domain === null) {
            return [
                'message' => 'Domínio não encontrado',
                'status' => false
            ];
        }

        try {
            $domain->delete();

            return [
                'message' => 'Domínio deletado com sucesso',
                'status' => true
            ];
        } catch (\Exception $e) {
            Log::error('Error deleting domain: ' . $e->getMessage(), [$e]);

            return [
                'message' => 'Ocorreu um erro ao deletar o domínio',
                'status' => false
            ];
        }
    }

    public function updateDomain($id, $request)
    {
        $domain = Domain::find($id);

        if ($domain === null) {
            return [
                'message' => 'Domínio nao encontrado',
                'status' => false
            ];
        }

        try {
            $domain->update([
                'name' => $request->name,
                'domain' => $request->domain,
                'client' => $request->client,
                'observation' => $request->observation,
                'active' => $request->active,
                'expiration_date' => $request->expiration_date
            ]);

            return [
                'message' => 'Domínio atualizado com sucesso',
                'status' => true
            ];
        } catch (\Exception $e) {
            Log::error('Error updating domain: ' . $e->getMessage(), [$e]);

            return [
                'message' => 'Ocorreu um erro ao atualizar o domínio',
                'status' => false
            ];
        }
    }
}
