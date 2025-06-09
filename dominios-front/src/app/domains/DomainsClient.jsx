"use client";

import { deleteDomain } from "@/services/domains";
import { useState } from "react";
import Link from "next/link";

export default function DomainsClient({ domains }) {
    const [data, setData] = useState(domains);

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Tem certeza que deseja deletar este domínio?");
        if (confirmed) {
            await deleteDomain(id);
            setData(data.filter(domain => domain.id !== id));
        }
    };

    return (

        <div className="overflow-x-auto">
            <div className="mb-5"></div>
            <Link href="/domain/create" className="rounded-lg hover:bg-red-600 bg-red-800 text-white px-4 py-2">Criar novo</Link>
            <section className="inline-block align-middle w-full mt-10">
                <div className="rounded-lg bg-white p-4 leading-normal text-red-500 min-w-[600px] sm:min-w-full">
                    <table className="w-full border-collapse">
                        <thead>
                        <tr>
                            <th className="px-2 py-2 text-sm sm:text-base text-[#490c0d]">Nome</th>
                            <th className="px-2 py-2 text-sm sm:text-base text-[#490c0d]">URL</th>
                            <th className="px-2 py-2 text-sm sm:text-base text-[#490c0d]">Cliente</th>
                            <th className="px-2 py-2 text-sm sm:text-base text-[#490c0d]">Ativo</th>
                            <th className="px-2 py-2 text-sm sm:text-base text-[#490c0d]">Editar</th>
                            <th className="px-2 py-2 text-sm sm:text-base text-[#490c0d]">Deletar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((domain, index) => (
                            <tr key={index} className="text-gray-800 text-sm sm:text-base text-center">
                                <td className="h-12 px-2 py-2">{domain.name}</td>
                                <td className="h-12 px-2 py-2">{domain.domain}</td>
                                <td className="h-12 px-2 py-2 font-semibold">{domain.client}</td>
                                <td className="h-12 px-2 py-2 font-semibold">{domain.active ? "Sim" : "Não"}</td>
                                <td className="h-12 px-2 py-2 font-semibold"><Link href={`/domain/${domain.id}`}>✏️</Link></td>
                                <td
                                    className="h-12 px-2 py-2 cursor-pointer hover:text-red-600 font-semibold"
                                    onClick={() => handleDelete(domain.id)}
                                >
                                    🗑️
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
