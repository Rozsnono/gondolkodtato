"use client";
import { Icon } from "@/icons/Icon";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "@/services/user.context";

export default function ManagePage() {

    const type = useParams().type;
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState(type || "quiz");


    return (
        <main className="flex flex-col gap-6">
            <h1 className="text-4xl font-bold">Adminisztráció</h1>

            <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-600/70 p-1">
                <button className={`rounded-md  px-4 py-1 text-slate-200 cursor-pointer ${selectedTab === "quiz" ? "bg-slate-900" : "bg-transparent"} duration-200`} onClick={() => { setSelectedTab("quizzes"); router.replace("/manage/quiz") }}>Kvízek kezelése</button>
                <button className={`rounded-md  px-4 py-1 text-slate-200 cursor-pointer ${selectedTab === "material" ? "bg-slate-900" : "bg-transparent"} duration-200`} onClick={() => { setSelectedTab("materials"); router.replace("/manage/material") }}>Tananyagok kezelése</button>
            </div>

            {
                selectedTab === "quiz" ? <QuizManagement /> : <MaterialManagement />
            }

        </main>
    )
}

function QuizManagement() {
    const { user } = useContext(UserContext);


    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['manage', 'quiz'],
        queryFn: async () => {
            const res = await fetch(`/api/manage/quiz?playerId=${user._id}`);
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        }
    })

    async function handleDelete(id: string) {
        const res = await fetch(`/api/manage/quiz?playerId=${user._id}&quizId=${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Network response was not ok');
        refetch();
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Kvízek kezelése</h1>
                <Link href="/manage/new-quiz" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-200 hover:bg-slate-200/80 text-slate-900 shadow-sm cursor-pointer h-9 px-4 py-2">
                    <Icon.Add size={18} onlyStrokes strokeWidth={2} />
                    Készíts új kvízt
                </Link>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4">
                {
                    data?.quizzes.map((quiz: any) => (
                        <QuizManagementCard handleDelete={handleDelete} key={quiz._id} quiz={quiz} />
                    ))
                }
            </div>

        </div>
    );
}

function QuizManagementCard({ quiz, handleDelete }: { quiz: any, handleDelete: (id: string) => void }) {

    function DifficultyBadge({ level, color }: { level: string; color?: string }) {
        if (level.toLocaleLowerCase() === "easy") color = "bg-green-200/90 text-green-900";
        if (level.toLocaleLowerCase() === "medium") color = "bg-yellow-200/90 text-yellow-900";
        if (level.toLocaleLowerCase() === "hard") color = "bg-red-300/90 text-red-900";

        return (
            <span className={`inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium ${color}`}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
            </span>
        )
    }

    return (
        <div className="border border-slate-600 rounded-md p-6 flex justify-between items-center">
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold">{quiz.title}</h2>
                <p className="text-sm text-slate-500">{quiz.description}</p>
                <div className="flex gap-4 items-center">
                    <span className="text-sm text-slate-200">{quiz.questions.length} kérdés</span>
                    <span className="text-sm text-slate-200"><DifficultyBadge level={quiz.difficulty} /></span>
                    <span className="text-sm text-slate-200">{quiz.attempts} próbálkozás</span>
                </div>
            </div>
            <div className="flex justify-end items-center gap-2">
                <button className="text-sm text-slate-300 border border-slate-600/50 rounded-md p-2 px-3 hover:bg-slate-600/50 cursor-pointer"><Icon.Edit size={16} /></button>
                <button className="text-sm text-slate-300 border border-slate-600/50 rounded-md p-2 px-3 hover:bg-slate-600/50 cursor-pointer"><Icon.Eye size={16} onlyStrokes strokeWidth={2} /></button>
                <button className="text-sm text-slate-300 border border-slate-600/50 rounded-md p-2 px-3 hover:bg-slate-600/50 cursor-pointer" onClick={() => handleDelete(quiz._id)}><Icon.Trash size={16} /></button>
            </div>
        </div>
    );
}



function MaterialManagement() {

    const { user } = useContext(UserContext);


    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['manage', 'material'],
        queryFn: async () => {
            const res = await fetch(`/api/manage/material?playerId=${user._id}`);
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        }
    })

    async function handleDelete(id: string) {
        const res = await fetch(`/api/manage/quiz?playerId=${user._id}&quizId=${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Network response was not ok');
        refetch();
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Tananyagok kezelése</h1>
                <Link href="/manage/new-material" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-200 hover:bg-slate-200/80 text-slate-900 shadow-sm cursor-pointer h-9 px-4 py-2">
                    <Icon.Add size={18} onlyStrokes strokeWidth={2} />
                    Új tananyag hozzáadása
                </Link>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4">
                {data?.materials.map((material: any) => (
                    <MaterialManagementCard key={material._id} material={material} handleDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
}

function MaterialManagementCard({ material, handleDelete }: { material: any; handleDelete: (id: string) => void }) {

    function FileIcon({ type }: { type: string }) {
        if (type === "pdf" || type === "docx") return <Icon.File.Doc size={24} onlyStrokes strokeWidth={2} className="me-2 text-red-500" />;
        if (type === "png" || type === "jpg" || type === "jpeg") return <Icon.File.Image size={24} onlyStrokes strokeWidth={2} className="me-2 text-blue-500" />;
        if (type === "mp4" || type === "mkv") return <Icon.File.Video size={24} onlyStrokes strokeWidth={2} className="me-2 text-purple-500" />;
        return <Icon.File.Doc onlyStrokes strokeWidth={2} size={24} />;
    }
    return (
        <div className="border border-slate-600 rounded-md p-6 flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <FileIcon type={material.fileInfo.type} />
                <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-bold">{material.title}</h2>
                    <div className="flex gap-1 items-center">
                        <span className="text-sm text-slate-400">{(material.fileInfo.size / 1024 / 1024).toFixed(2)} MB</span>
                        <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                        <span className="text-sm text-slate-400">{material.downloads} downloads</span>
                    </div>
                </div>

            </div>
            <div className="flex justify-end items-center gap-2">
                <button className="text-sm text-slate-300 border border-slate-600/50 rounded-md p-2 px-3 hover:bg-slate-600/50 cursor-pointer"><Icon.Edit size={16} /></button>
                <button className="text-sm text-slate-300 border border-slate-600/50 rounded-md p-2 px-3 hover:bg-slate-600/50 cursor-pointer"><Icon.Eye size={16} onlyStrokes strokeWidth={2} /></button>
                <button onClick={() => handleDelete(material._id)} className="text-sm text-slate-300 border border-slate-600/50 rounded-md p-2 px-3 hover:bg-slate-600/50 cursor-pointer"><Icon.Trash size={16} /></button>
            </div>
        </div>
    );
}