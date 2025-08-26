"use client";
import { Icon } from '@/icons/Icon';
import { UserContext } from '@/services/user.context';
import { useState, ChangeEvent, FormEvent, useContext } from 'react';

export default function FileUpload() {

    const { user } = useContext<any>(UserContext);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        if (e.target['material-file'].files[0]) {
            formData.append('file', e.target['material-file'].files[0]);
        }
        formData.append('title', e.target['material-title'].value);
        formData.append('category', e.target['material-category'].value);
        if (e.target['material-link'].value) {
            formData.append('link', e.target['material-link'].value);
        }

        try {
            const res = await fetch('/api/material/upload?playerId=' + (user?._id || ''), {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                console.log('Server response:', data);
            } else {
            }
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className="flex flex-col gap-6" >
            <h1 className="text-4xl font-bold">Tananyag hozzáadása</h1>

            <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 grid-cols-1 lg:max-w-4xl w-full mx-auto gap-4 lg:p-6 p-2 border border-slate-600/30 rounded-lg">
                <TextInput label="Tananyag címe" placeholder="Írd be a tananyag címét..." className="lg:col-span-2" id="material-title" />
                <TextInput label="Kategória" placeholder="Írd be a tananyag kategóriáját..." id="material-category" />
                <TextInput label="Tananyag külső URL (opcionális)" placeholder="Írd be a tananyag külső URL-jét..." className="" id="material-link" />

                <FileInput label="Fájl feltöltése" className="lg:col-span-2" id="material-file" />

                <div className="flex justify-end col-span-2">
                    <button type="submit" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-200 hover:bg-slate-200/80 text-slate-900 shadow-sm cursor-pointer h-9 px-4 py-2">
                        <Icon.Add size={18} onlyStrokes strokeWidth={2} />
                        Tananyag mentése
                    </button>
                </div>
            </form>

        </div>
    );
}


function TextInput({ label, className, placeholder, id }: { label: string; className?: string; placeholder?: string; id: string }) {
    return (
        <div className={`w-full flex gap-1 flex-col ${className}`}>
            <label className="block text-sm font-medium text-slate-300">{label}</label>
            <input id={id} type="text" className="border border-slate-600 rounded-md p-2 w-full bg-slate-900" placeholder={placeholder} />
        </div>
    );
}


function AreaInput({ label, className, rows, placeholder, id }: { label: string; className?: string; rows?: number; placeholder?: string; id: string }) {
    return (
        <div className={`w-full flex gap-1 flex-col ${className}`}>
            <label className="block text-sm font-medium text-slate-300">{label}</label>
            <textarea id={id} className="border border-slate-600 rounded-md p-2 w-full bg-slate-900" rows={rows || 4} style={{ resize: "none" }} placeholder={placeholder} />
        </div>
    );
}

function SelectInput({ label, options, id }: { label: string; options: string[]; id: string }) {
    return (
        <div className="w-full flex gap-1 flex-col">
            <label className="block text-sm font-medium text-slate-300">{label}</label>
            <select id={id} className="border border-slate-600 rounded-md p-2 w-full bg-slate-900">
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

function FileInput({ label, className, id }: { label: string; className?: string; id: string }) {

    return (
        <div className={`w-full flex gap-1 flex-col ${className}`}>
            <label className="block text-sm font-medium text-slate-300">{label}</label>
            <input type="file" accept='.pdf,.doc,.docx,video/mp4,video/mkv,image/png,image/jpeg,image/jpg' className="border border-slate-600 rounded-md p-2 w-full bg-slate-900" id={id} />
            <span className="text-slate-400 text-sm">Figyelj a formátumra: .pdf, .doc, .docx, .mp4, <b>maximum 50 MB</b></span>
        </div>
    );
}