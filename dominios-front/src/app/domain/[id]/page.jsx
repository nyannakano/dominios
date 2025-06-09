'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDomain, getUser } from '@/services/domains';
import EditDomainForm from './EditDomainForm';

export default function Page({ params }) {
    const [domain, setDomain] = useState(null);
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
                await getUser(token);

                const response = await getDomain(params.id);
                setDomain(response.data.domain);
            } catch {
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.id, router]);

    if (loading || !domain) {
        return <div className="mt-20 text-center">Carregando...</div>;
    }

    return (
        <div className="animate-slide-in max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-8">
                Editar domínio: {domain.id}
            </h1>
            <EditDomainForm domain={domain} />
        </div>
    );
}
