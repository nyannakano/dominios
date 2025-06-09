'use client';

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
    const { isLoggedIn, logout } = useAuth();
    const router = useRouter();

    return (
        <header>
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 sm:p-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <Link href="/"><img className="w-8 h-8" src="/alien.svg" alt="Site logo" /></Link>
                    <div className="hidden sm:flex flex-col text-white">
                        <span className="font-bold text-sm">Domains Controller</span>
                        <span className="text-xs">Controle seus domínios</span>
                    </div>
                </div>

                <div className="hidden sm:block ml-auto">
                    {isLoggedIn ? (
                        <button onClick={logout} className="font-bold text-white hover:underline">
                            Logout
                        </button>
                    ) : (
                        <Link href="/login" className="font-bold text-white hover:underline">
                            Login
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}