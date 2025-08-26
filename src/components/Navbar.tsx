"use client";
import { Icon } from "@/icons/Icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import Login from "./Login";
import { UserContext } from "@/services/user.context";

export default function Navbar() {

    const path = usePathname();
    const { user, setUser } = useContext(UserContext);


    function isActive(route: string) {
        if (path === route || (path.includes(route) && route !== "/")) {
            return "shadow bg-slate-400/80 text-slate-950";
        }
        return "hover:bg-slate-400/10 text-slate-200";
    }

    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (

        <nav className="backdrop-blur-md border-b border-slate-500/30 px-4 py-3 z-50">

            <div className="max-w-7xl mx-auto flex items-center justify-between">

                <div className="flex items-center space-x-4">

                    <div className="flex items-center space-x-2">
                        <Icon.Brain size={36} className="text-slate-400" />

                        <span className="text-2xl font-bold text-slate-100">Gondolkodtató
                        </span>
                    </div>
                    <div className="hidden md:flex items-center space-x-6 ml-10">
                        <Link href="/" className={`justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 flex items-center space-x-2 cursor-pointer ${isActive("/")}`}>
                            <Icon.Home size={18} />
                            <span>Főoldal
                            </span>
                        </Link>
                        <Link href="/quizzes" className={`justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 flex items-center space-x-2 cursor-pointer ${isActive("/quizzes")}`}>
                            <Icon.Brain size={18} />
                            <span>Kvízek
                            </span>
                        </Link>
                        <Link href="/materials" className={`justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 flex items-center space-x-2 cursor-pointer ${isActive("/materials")}`}>
                            <Icon.Book size={18} />
                            <span>Tananyagok
                            </span>
                        </Link>
                        <Link href="/neptun" className={`justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 flex items-center space-x-2 cursor-pointer ${isActive("/neptun")}`}>
                            <Icon.DegreeHat size={18} onlyStrokes strokeWidth={2} />
                            <span>Neptun
                            </span>
                        </Link>
                        <Link href="/manage/quiz" className={`justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 flex items-center space-x-2 cursor-pointer ${isActive("/manage")}`}>
                            <Icon.Settings size={18} />
                            <span>Adminisztráció
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center space-x-4">

                    {
                        !user &&
                        <button onClick={() => setIsLoginOpen(!isLoginOpen)} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-slate-300 text-slate-300 shadow-sm hover:bg-slate-400/30 cursor-pointer h-9 px-4 py-2">
                            <Icon.User size={18} />
                            Belépés
                        </button>
                    }
                    {
                        isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />
                    }
                    {
                        user && user.name &&
                        <span onClick={() => setUser(null)} className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full cursor-pointer">
                            <span className="flex h-full w-full items-center justify-center rounded-full bg-slate-700">{user.name[0]}
                            </span>
                        </span>
                    }
                </div>
            </div>
        </nav>
    )
}