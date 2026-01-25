"use client";
import { Icon } from "@/icons/Icon";
import { UserContext } from "@/services/user.context";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";

export default function NeptunPage() {

    const { neptun, setNeptun } = useContext(UserContext);

    const uniRef = useRef<any>(null);

    const [state, setState] = useState<{ error: string | null, isLoading: boolean }>({ error: null, isLoading: false });
    const router = useRouter();

    async function handleLogin(event: any) {
        setState({ error: null, isLoading: true });
        event.preventDefault();
        const university = event.target['university'].value;
        uniRef.current = university;
        const neptunCode = event.target['neptun'].value;
        const password = event.target['password'].value;
        const code = event.target['code'].value;

        const res = await fetch(`/api/neptun/${university}/login`, {
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
            setState({ error: result.error, isLoading: false });
            return;
        }

        console.log('Login successful:', result);
        setState({ error: null, isLoading: false });

        // Save the Neptun code to the context
        setNeptun({ code: neptunCode, token: result.token, loggedIn: new Date().getTime() });
    }

    useEffect(() => {
        if (neptun && neptun.token) {
            router.push(`/neptun/${uniRef.current}/dashboard`);
        }
    }, [neptun]);

    const [passWordType, setPassWordType] = useState<'text' | 'password'>('password');

    return (
        <main className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">Neptun</h1>
            </div>

            <div className="flex flex-col lg:w-3xl w-full mx-auto border border-slate-800 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-2 mx-auto">Neptun Belépés</h2>
                <h4 className="text-lg mb-4 mx-auto text-slate-300">Kérjük, adja meg a Neptun kódját és a hozzá tartozó jelszavát.</h4>
                <form className="flex-1 px-4 py-6" onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="university" className="block text-sm font-medium text-slate-100">Egyetem</label>
                        <select name="university" id="university" className="mt-1 block w-full rounded-md border border-slate-400 bg-slate-800 p-2 text-slate-100">
                            <option value="sze">SZE</option>
                            <option value="soe">SOE</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="neptun" className="block text-sm font-medium text-slate-100">Neptun Kód</label>
                        <input type="text" id="neptun" className="mt-1 block w-full rounded-md border border-slate-400 bg-slate-800 p-2 text-slate-100" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-slate-100">Jelszó</label>
                        <div className="flex mt-1 block w-full rounded-md border border-slate-400 bg-slate-800 text-slate-100 pe-2">
                            <input type={passWordType} id="password" className="outline-none p-2 w-full" />
                            <div onClick={() => setPassWordType(passWordType === 'password' ? 'text' : 'password')} className="flex items-center">
                                {
                                    passWordType !== 'password' ? (
                                        <Icon.Eye onlyStrokes strokeWidth={2} className="h-5 w-5 cursor-pointer" />
                                    ) : (
                                        <Icon.EyeOff onlyStrokes strokeWidth={2} className="h-5 w-5 cursor-pointer" />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="code" className="block text-sm font-medium text-slate-100">Google Kód</label>
                        <input type="text" id="code" className="mt-1 block w-full rounded-md border border-slate-400 bg-slate-800 p-2 text-slate-100" />
                    </div>
                    {
                        state.error && (
                            <p className="text-sm text-red-400 flex items-center gap-1">
                                <Icon.Alert size={16} strokeWidth={2} onlyStrokes />
                                {state.error}
                            </p>
                        )
                    }
                    <button disabled={state.isLoading} type="submit" className="w-full rounded-md bg-slate-400 p-2 text-slate-900 hover:bg-slate-300 cursor-pointer mt-6 flex justify-center items-center gap-2">
                        {state.isLoading && <Icon.Loader size={20} className="animate-spin"/>}
                        Bejelentkezés
                        </button>
                </form>
            </div>
        </main>
    )
}