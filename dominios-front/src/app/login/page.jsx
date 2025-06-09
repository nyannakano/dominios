'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            setIsLoading(false);
            return;
        }

        axios.get('http://localhost:8000/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => router.push('/domains'))
            .catch(() => {
                localStorage.removeItem('auth_token');
                setIsLoading(false);
            });
    }, [router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                email,
                password,
            });

            const token = response.data.token;

            // Salva o token no localStorage e no axios global
            localStorage.setItem('auth_token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            router.push('/domains');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Erro ao fazer login');
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="text-center mt-20">
                <p>Verificando autenticação...</p>
            </div>
        );
    }

    return (
        <div className="text-center animate-slide-in mt-20">
            <img className="w-16 h-16 mx-auto mb-5" src="/alien.svg" alt="Site logo" />
            <h1 className="text-2xl font-bold mb-5">Fazer Login</h1>

            {error && (
                <div className="mb-4 text-sm text-red-600">{error}</div>
            )}

            <form onSubmit={handleLogin}>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-50"
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-50"
                        required
                    />
                </div>
                <button
                    className="rounded-lg hover:bg-red-600 bg-red-800 text-white px-4 py-2"
                    disabled={isLoading}
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}
