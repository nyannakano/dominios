'use client';

import { useState } from 'react';
import { updateDomain } from '@/services/domains';
import Link from "next/link";

export default function EditDomainForm({ domain }) {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setMessage('');
        setSuccess('');

        const formData = new FormData(e.target);

        const data = {
            name: formData.get('name'),
            domain: formData.get('domain'),
            client: formData.get('client'),
            active: formData.get('active') === 'on',
            expiration_date: formData.get('expiration_date'),
            observation: formData.get('observation'),
        };

        try {
            await updateDomain(domain.id, data);
            setSuccess('Domínio atualizado com sucesso!');
        } catch (err) {
            const res = err.response?.data;
            setMessage(res?.message || 'Erro ao atualizar domínio');
            if (res?.errors) setErrors(res.errors);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {message && (
                <div className="text-red-600 text-sm font-medium bg-red-50 border border-red-200 p-3 rounded">
                    {message}
                </div>
            )}

            {success && (
                <div className="text-green-700 text-sm font-medium bg-green-50 border border-green-200 p-3 rounded">
                    {success}
                </div>
            )}

            <div>
                <label htmlFor="name text-white">Nome do Domínio</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={domain.name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
                )}
            </div>

            <div>
                <label htmlFor="domain text-white">URL do Dominio</label>
                <input
                    type="text"
                    id="domain"
                    name="domain"
                    defaultValue={domain.domain}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {errors.domain && (
                    <p className="text-red-500 text-sm mt-1">{errors.domain[0]}</p>
                )}
            </div>

            <div>
                <label htmlFor="client text-white">Nome do Cliente</label>
                <input
                    type="text"
                    id="client"
                    name="client"
                    defaultValue={domain.client}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {errors.client && (
                    <p className="text-red-500 text-sm mt-1">{errors.client[0]}</p>
                )}
            </div>

            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="active"
                    name="active"
                    defaultChecked={domain.active}
                    className="h-4 w-4"
                />
                <label htmlFor="active" className="ml-2">
                    Ativo
                </label>
            </div>

            <div>
                <label htmlFor="expiration_date text-white">Data de expiração</label>
                <input
                    type="date"
                    id="expiration_date"
                    name="expiration_date"
                    defaultValue={domain.expiration_date?.split('T')[0] || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {errors.expiration_date && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.expiration_date[0]}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="observations">Observações</label>
                <textarea
                    id="observations"
                    name="observation"
                    defaultValue={domain.observation || ''}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {errors.observation && (
                    <p className="text-red-500 text-sm mt-1">{errors.observation[0]}</p>
                )}
            </div>

            <div className="flex justify-end pt-4">
                <Link href="/domains"
                    type="button"
                    className="px-4 py-2 border rounded-md text-black bg-white hover:bg-black hover:text-white"
                >
                    Voltar
                </Link>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 border rounded-md text-black bg-white hover:bg-black hover:text-white"
                >
                    {loading ? 'Salvando...' : 'Salvar'}
                </button>
            </div>
        </form>
    );
}
