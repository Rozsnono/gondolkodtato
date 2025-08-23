"use client";
import { Icon } from "@/icons/Icon";
import { UserContext } from "@/services/user.context";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function NeptunPage() {

    const { neptun, setNeptun } = useContext(UserContext);

    const router = useRouter();

    async function handleLogin(event: any) {
        event.preventDefault();
        const neptunCode = event.target['neptun'].value;
        const password = event.target['password'].value;
        const code = event.target['code'].value;

        const res = await fetch('/api/neptun/sze/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: neptunCode,
                password,
                code
            }),
        });

        const result = await res.json();
        if (result.error) {
            console.error('Login failed:', result.error);
            return;
        }

        console.log('Login successful:', result);

        // Save the Neptun code to the context
        setNeptun({ code: neptunCode, token: result.token, loggedIn: new Date().getTime() });
    }

    useEffect(() => {
        if(neptun && neptun.token){
            router.push('/neptun/dashboard');
        }
    }, [neptun]);

    return (
        <main className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">SZE Neptun</h1>
            </div>

            <div className="flex flex-col lg:w-3xl w-full mx-auto border border-slate-800 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-2 mx-auto">Neptun Belépés</h2>
                <h4 className="text-lg mb-4 mx-auto text-slate-300">Kérjük, adja meg a Neptun kódját és a hozzá tartozó jelszavát.</h4>
                <form className="flex-1 px-4 py-6" onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="neptun" className="block text-sm font-medium text-slate-100">Neptun Kód</label>
                        <input type="text" id="neptun" className="mt-1 block w-full rounded-md border border-slate-400 bg-slate-800 p-2 text-slate-100" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-slate-100">Jelszó</label>
                        <input type="password" id="password" className="mt-1 block w-full rounded-md border border-slate-400 bg-slate-800 p-2 text-slate-100" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="code" className="block text-sm font-medium text-slate-100">Google Kód</label>
                        <input type="text" id="code" className="mt-1 block w-full rounded-md border border-slate-400 bg-slate-800 p-2 text-slate-100" />
                    </div>
                    <button type="submit" className="w-full rounded-md bg-slate-400 p-2 text-slate-900 hover:bg-slate-300 cursor-pointer mt-6">Bejelentkezés</button>
                </form>
            </div>
        </main>
    )
}