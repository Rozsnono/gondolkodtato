"use client";
import { Icon } from "@/icons/Icon";
import { UserContext } from "@/services/user.context";
import { useContext, useState } from "react";

export default function Login({ onClose }: { onClose: () => void }) {

    const [formType, setFormType] = useState<'login' | 'register'>('login');

    return (
        <main className="fixed top-0 left-0 w-screen h-screen bg-black/30 flex justify-center lg:items-center items-start p-4 z-[1001]">
            <div className="flex flex-col 2xl:w-1/4 lg:w-1/2 w-full rounded-lg border border-slate-400 bg-slate-900 p-4 relative">
                {
                    formType === 'login' ? (
                        <div className="flex-1 p-4">
                            <h1 className="text-3xl font-bold text-slate-100">Belépés</h1>
                            <p className="text-sm text-slate-400">Üdvözöljük újra! Jelentkezzen be fiókjába.</p>
                        </div>) : (
                        <div className="flex-1 p-4">
                            <h1 className="text-3xl font-bold text-slate-100">Regisztráció</h1>
                            <p className="text-sm text-slate-400">Hozzon létre egy új fiókot.</p>
                        </div>
                    )
                }

                <div className="absolute top-4 right-4">
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-100 cursor-pointer">
                        <Icon.Close size={24} />
                    </button>
                </div>

                {
                    formType === 'login' ? (
                        <LoginForm changeForm={setFormType} />
                    ) : (
                        <RegisterForm changeForm={setFormType} />
                    )
                }

            </div>
        </main>
    )
}

function LoginForm({ changeForm }: { changeForm: (form: 'login' | 'register') => void }) {

    const { setUser } = useContext(UserContext);

    async function handleSubmit(event: any) {
        event.preventDefault();

        const formData = {
            name: event.target.name.value,
            password: event.target.password.value,
        };

        // Call your login API here

        const res = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (res.ok) {
            console.log('Login successful:', data);
            setUser(data.player);
            alert('Sikeres belépés!');
            location.reload();
        } else {
            console.error('Login failed:', data);
        }
    }

    return (
        <form className="flex-1 px-4 py-6" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-slate-100">Név</label>
                <input type="text" id="name" className="mt-1 block w-full rounded-md border border-slate-400 bg-slate-800 p-2 text-slate-100" />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-slate-100">Jelszó</label>
                <input type="password" id="password" className="mt-1 block w-full rounded-md border border-slate-400 bg-slate-800 p-2 text-slate-100" />
            </div>
            <button type="submit" className="w-full rounded-md bg-slate-400 p-2 text-slate-900 hover:bg-slate-300 cursor-pointer">Bejelentkezés</button>

            <div className="mt-4">
                <p className="text-sm text-slate-400">Nincs fiókja? <a href="#" onClick={() => changeForm('register')} className="text-slate-100 hover:underline">Regisztráljon</a></p>
            </div>
        </form>
    )
}

function RegisterForm({ changeForm }: { changeForm: (form: 'login' | 'register') => void }) {

    async function handleSubmit(event: any) {
        event.preventDefault();

        const formData = {
            name: event.target.name.value,
            password: event.target.password.value,
            email: event.target.email.value,
        };

        // Call your login API here

        const res = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (res.ok) {
            console.log('Login successful:', data);
            alert('Regisztráció sikeres!');
            changeForm('login');
        } else {
            console.error('Login failed:', data);
        }
    }

    return (
        <form className="flex-1 px-4 py-6" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-slate-100">Név</label>
                <input type="text" id="name" className="mt-1 block w-full rounded-md border border-slate-400 bg-slate-800 p-2 text-slate-100" />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-slate-100">Email</label>
                <input type="email" id="email" className="mt-1 block w-full rounded-md border border-slate-400 bg-slate-800 p-2 text-slate-100" />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-slate-100">Jelszó</label>
                <input type="password" id="password" className="mt-1 block w-full rounded-md border border-slate-400 bg-slate-800 p-2 text-slate-100" />
            </div>
            <button type="submit" className="w-full rounded-md bg-slate-400 p-2 text-slate-900 hover:bg-slate-300 cursor-pointer">Regisztráció</button>

            <div className="mt-4">
                <p className="text-sm text-slate-400">Van már fiókja? <a href="#" onClick={() => changeForm('login')} className="text-slate-100 hover:underline">Jelentkezzen be</a></p>
            </div>
        </form>
    )
}