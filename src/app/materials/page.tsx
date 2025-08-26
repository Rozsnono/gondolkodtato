"use client";
import { Icon } from "@/icons/Icon";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function MaterialsPage() {

    const [category, setCategory] = useState<string>('');

    const { data, isLoading, isError, error: serviceError, refetch } = useQuery({
        queryKey: ['neptun-sze-filters'],
        queryFn: async () => {
            const res = await fetch('/api/material' + (category ? `?category=${category}` : ''), {
            });
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        }
    });

    useEffect(() => {
        refetch();
    }, [category, refetch]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <main className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">Tananyagok</h1>
                <Link href='manage/new-material' className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-200 hover:bg-slate-200/80 text-slate-900 shadow-sm cursor-pointer h-9 px-4 py-2">
                    <Icon.Upload size={18} onlyStrokes strokeWidth={2} />
                    Anyag feltöltése
                </Link>
            </div>

            <div className="flex flex-wrap gap-2">

                <CategoryBadge title="Összes kategória" count={data?.categories.reduce((acc: number, category: any) => acc + category.count, 0)} isSelected={category === ''} onClick={() => setCategory('')} />
                {
                    data?.categories.map((c: any) => (
                        <CategoryBadge key={c._id} title={c._id} count={c.count} isSelected={category === c._id} onClick={() => setCategory(c._id)} />
                    ))
                }

            </div>

            <div className="grid grid-cols-3 gap-6">

                {
                    data?.data.map((material: any) => (
                        <MaterialCard id={material._id} key={material._id} title={material.title} fileType={material.fileInfo.type} fileSize={material.fileInfo.size} downloads={material.downloads} uploadedBy={material.createdBy} uploadedAt={material.createdAt} fileUrl={material.fileInfo.fileRoute} />
                    ))
                }
            </div>
        </main>
    )
}

function CategoryBadge({ title, count, isSelected, onClick }: { title: string; count: number; isSelected: boolean; onClick: () => void }) {
    return (
        <button onClick={onClick} className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${isSelected ? 'bg-slate-200 hover:bg-slate-200/80 text-slate-900' : 'border border-slate-600 hover:bg-slate-500/40 text-slate-200'} shadow-sm cursor-pointer h-9 px-4 py-2`}>
            {title}
            <div className="flex items-center justify-center px-3 p-1 bg-slate-950/80 text-xs text-slate-100 rounded-lg">
                {count}
            </div>
        </button>
    )
}

function MaterialCard({ title, fileType, fileSize, downloads, uploadedBy, uploadedAt, fileUrl, id }: { title: string; fileType: string; fileSize: number; downloads: number; uploadedBy: string; uploadedAt: string; fileUrl: string, id: string }) {

    function FileIcon({ type }: { type: string }) {
        if (type === "pdf") return <Icon.File.Doc size={16} onlyStrokes strokeWidth={2} className="me-2 text-red-500" />;
        if (type === "docx") return <Icon.File.Doc size={16} onlyStrokes strokeWidth={2} className="me-2 text-blue-500" />;
        if (type === "png" || type === "jpg" || type === "jpeg") return <Icon.File.Image size={16} onlyStrokes strokeWidth={2} className="me-2 text-orange-500" />;
        if (type === "mp4" || type === "mkv") return <Icon.File.Video size={16} onlyStrokes strokeWidth={2} className="me-2 text-purple-500" />;
        return <Icon.File.Doc size={16} />;
    }

    async function DownloadFromUrl() {
        try {
            const res = await fetch(`/api/material/download?id=${id}`);
            const { link } = await res.json();
            const a = document.createElement('a');
            a.href = link;
            a.download = link.split('/').pop() || 'file';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error('Letöltési hiba:', error);
        }
    }

    function Preview() {
        window.open(fileUrl, '_blank', 'noopener,noreferrer');
    }

    return (
        <div className="border border-slate-600/70 rounded-lg p-6 flex flex-col">
            <div className="flex items-center text-xl">
                <FileIcon type={fileType} />
                {title}
            </div>
            <div className="w-full flex text-sm text-slate-600">
                Feltöltve {new Date(uploadedAt).toLocaleDateString()}-n
            </div>

            <div className="mt-4 flex flex-col text-slate-200 gap-2 text-md">
                <span className="flex items-center justify-between">
                    <span>Fájl méret:</span>
                    <span className="text-slate-100">{(fileSize / 1024 / 1024).toFixed(2)} MB</span>
                </span>
                <span className="flex items-center justify-between">
                    <span>Letöltések:</span>
                    <span className="text-slate-100">{downloads}</span>
                </span>
                <span className="flex items-center justify-between">
                    <span>Fájl típusa:</span>
                    <span className="text-slate-100 flex items-center justify-center px-3 p-1 bg-slate-950/80 text-xs text-slate-100 rounded-lg">{fileType.toUpperCase()}</span>
                </span>
            </div>

            <div className="flex mt-6 gap-2">
                {
                    fileType != 'docx' &&
                    <button onClick={Preview} className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-slate-300 text-slate-300 shadow-sm hover:bg-slate-400/30 cursor-pointer h-9 px-4 py-2">
                        <Icon.Eye onlyStrokes size={16} strokeWidth={2} className="me-1" />
                        Előnézet
                    </button>
                }
                <button onClick={DownloadFromUrl} className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-200 hover:bg-slate-200/80 text-slate-900 shadow-sm cursor-pointer h-9 px-4 py-2">
                    <Icon.Download onlyStrokes size={16} strokeWidth={2} className="me-1" />
                    Letöltés
                </button>
            </div>
        </div>
    )
}