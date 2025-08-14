"use client";
import React, { useEffect } from "react";
import { createContext } from "react";


export interface Homes {
    user: any;
    setUser: (homes: any[]) => void;
    neptun: any;
    setNeptun: (neptun: any) => void;
}

export const UserContext = createContext<Homes>({
    user: null,
    setUser: (user: any) => { },
    neptun: null,
    setNeptun: (neptun: any) => { },
});

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<any>(null);
    const [neptun, setNeptun] = React.useState<any>(null);

    useEffect(() => {
        const cookie = document.cookie.split('; ').find(row => row.startsWith('user='));
        if (!cookie) {
            saveUserToCookie(user, 'user');
        }
    }, [user]);

    useEffect(() => {
        const cookie = document.cookie.split('; ').find(row => row.startsWith('user='));
        if (cookie) {
            const cUser = JSON.parse(cookie.split('=')[1]);
            setUser(cUser);
        }
        const cookieNeptun = document.cookie.split('; ').find(row => row.startsWith('neptun='));
        if (cookieNeptun) {
            const cNeptun = JSON.parse(cookieNeptun.split('=')[1]);
            if(new Date(cNeptun.loggedIn).getTime() < new Date().getTime() - (86400000 / 24 / 60)) {
                deleteToken('neptun');
            } else {
                setNeptun(cNeptun);
            }
        }
    }, [])

    useEffect(() => {
        const cookie = document.cookie.split('; ').find(row => row.startsWith('neptun='));
        if (!cookie) {
            saveUserToCookie(neptun, 'neptun');
        }
    }, [neptun]);

    return (
        <UserContext.Provider value={{ user: user, setUser: setUser, neptun: neptun, setNeptun: setNeptun }}>
            {children}
        </UserContext.Provider>
    );
}

export function saveUserToCookie(user: any, name: string) {
    if (typeof window !== "undefined" && user) {
        document.cookie = `${name}=${JSON.stringify(user)}; path=/; max-age=31536000;`;
    }
}

export function deleteToken(name: string) {
    if (typeof window !== "undefined") {
        document.cookie = `${name}=; path=/; max-age=0;`;
    }
}