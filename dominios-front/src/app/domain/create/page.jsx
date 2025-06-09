'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createDomain, getUser } from '@/services/domains';
import Link from 'next/link';

export default function Page() {
    const [message, setMessage] = useState(null);
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            router.push('/login');
            return;
        }

        fetch('http://localhost:8000/api/user', {
            headers: { Authorization: `Bearer ${token}` },
        }).catch(() => router.push('/login'));
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setType('');
        setLoading(true);

        const form = e.target;
        const data = {
            name: form.name.value.trim(),
            domain: form.domain.value.trim(),
            client: form.client.value.trim(),
            active: form.active.checked,
            expiration_date: form.expiration_date.value || null,
            observation: form.observation.value.trim(),
        };

        try {
            await createDomain(data);
            setType('success');
            setMessage('Domínio criado com sucesso!');
            form.reset();
        } catch (error) {
            const res = error.response?.data;
            const errorMessage =
                res?.message ||
                Object.values(res?.errors || {})
                    .flat()
                    .join(', ') ||
                'Erro ao criar domínio.';
            setType('error');
            setMessage(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-slide-in max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Criando Domínio</h1>

            {message && (
                <div
                    className={`mb-4 p-3 rounded-md text-sm ${
                        type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}
                >
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                        Nome do Domínio
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ex: Google"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="domain" className="block text-sm font-medium text-white mb-1">
                        URL do Dominio
                    </label>
                    <input
                        type="text"
                        id="domain"
                        name="domain"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://google.com"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="client" className="block text-sm font-medium text-white mb-1">
                        Nome do Cliente
                    </label>
                    <input
                        type="text"
                        id="client"
                        name="client"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Google INC."
                    />
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="active"
                        name="active"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="active" className="ml-2 block text-sm text-white">
                        Ativo
                    </label>
                </div>

                <div>
                    <label htmlFor="expiration_date" className="block text-sm font-medium text-white mb-1">
                        Data de expiração
                    </label>
                    <input
                        type="date"
                        id="expiration_date"
                        name="expiration_date"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="observations" className="block text-sm font-medium text-white mb-1">
                        Observações
                    </label>
                    <textarea
                        id="observations"
                        name="observation"
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Observações..."
                    />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                    <Link
                        href="/domains"
                        className="px-4 py-2 border rounded-md text-black bg-white hover:bg-black hover:text-white"
                    >
                        Voltar
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 text-bold border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {loading ? 'Salvando...' : 'Salvar'}
                    </button>
                </div>
            </form>
        </div>
    );
}
