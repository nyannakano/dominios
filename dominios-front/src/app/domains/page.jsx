'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DomainsClient from './DomainsClient';
import { getDomains } from '@/services/domains';

export default function DomainsPage() {
    const [domains, setDomains] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('auth_token');

            if (!token) {
                router.push('/login');
                return;
            }

            try {
                await fetchUser(token);
                const response = await getDomains();
                setDomains(response.data.domains);
            } catch (error) {
                console.error('Erro ao buscar dados', error);
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    const fetchUser = async (token) => {
        await fetch('http://localhost:8000/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };

    if (loading) {
        return <div className="mt-20 text-center">Carregando...</div>;
    }

    return (
        <div className="animate-slide-in mt-20 px-4">
            <DomainsClient domains={domains} />
        </div>
    );
}
