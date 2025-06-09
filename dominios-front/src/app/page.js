import Link from "next/link";

export default function Home() {
    return (
        <div className="text-center animate-slide-in mt-20">
            <img className="w-16 h-16 mx-auto mb-5" src="alien.svg" alt="Site logo"/>
            <h1 className="text-3xl font-bold">Seu site para controle de domínios</h1>
            <h2 className="text-xl mb-10">Como nunca imaginou</h2>
            <Link href="/login" className="rounded-lg hover:bg-red-600 bg-red-800 text-white px-4 py-2">Comece agora</Link>
        </div>
    );
}
