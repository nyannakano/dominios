<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateDomainRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'domain' => 'required|string|max:255',
            'client' => 'required|string|max:255',
            'active' => 'required|in:0,1',
            'expiration_date' => 'required|date',
            'observation' => 'nullable|string|max:1000'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'O nome é obrigatório.',
            'domain.required' => 'O domínio é obrigatório.',
            'client.required' => 'O cliente é obrigatório.',
            'active.required' => 'O status é obrigatório.',
            'active.in' => 'O status é obrigatório.',
            'expiration_date.required' => 'A data de expiração é obrigatória.',
            'observation.max' => 'A observação deve ter no máximo 1000 caracteres.',
            'name.max' => 'O nome deve ter no máximo 255 caracteres.',
            'domain.max' => 'O domínio deve ter no máximo 255 caracteres.',
            'client.max' => 'O cliente deve ter no máximo 255 caracteres.',
        ];
    }
}
