"use client";
import React, { useEffect } from "react";
import { createContext } from "react";


export interface Homes {
    user: any;
    setUser: (user: any) => void;
    neptun: any;
    setNeptun: (neptun: any) => void;
    savedSubjects: any[];
    setSavedSubjects: (subjects: any[]) => void;
}

export const UserContext = createContext<Homes>({
    user: null,
    setUser: (user: any) => { },
    neptun: null,
    setNeptun: (neptun: any) => { },
    savedSubjects: [],
    setSavedSubjects: (subjects: any[]) => { },
});

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<any>(null);
    const [neptun, setNeptun] = React.useState<any>(null);
    const [savedSubjects, setSavedSubjects] = React.useState<any[]>([]);

    useEffect(() => {
        saveToCookie(user, 'user');
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
            if (new Date(cNeptun.loggedIn).getTime() < new Date().getTime() - (86400000 / 24 / 6)) {
                deleteToken('neptun');
            } else {
                setNeptun(cNeptun);
            }
        }
        const cookieSavedSubjects = document.cookie.split('; ').find(row => row.startsWith('savedSubjects='));
        if (cookieSavedSubjects) {
            const cSavedSubjects = JSON.parse(cookieSavedSubjects.split('=')[1]);
            setSavedSubjects(cSavedSubjects);
        }

    }, [])

    useEffect(() => {
        const cookie = document.cookie.split('; ').find(row => row.startsWith('neptun='));
        if (!cookie) {
            saveToCookie(neptun, 'neptun');
        }
    }, [neptun]);

    useEffect(() => {
        console.log(savedSubjects);
        saveToCookie(savedSubjects, 'savedSubjects');
    }, [savedSubjects]);

    return (
        <UserContext.Provider value={{ user: user, setUser: setUser, neptun: neptun, setNeptun: setNeptun, savedSubjects: savedSubjects, setSavedSubjects: setSavedSubjects }}>
            {children}
        </UserContext.Provider>
    );
}

export function saveToCookie(data: any, name: string) {
    if (typeof window !== "undefined" && data) {
        document.cookie = `${name}=${JSON.stringify(data)}; path=/; max-age=31536000; expires=${new Date(Date.now() + 31536000000).toUTCString()}`;
    }
}

export function deleteToken(name: string) {
    if (typeof window !== "undefined") {
        document.cookie = `${name}=; path=/; max-age=0;`;
    }
}