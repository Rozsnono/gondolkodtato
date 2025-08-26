"use client";
import { Icon } from "@/icons/Icon";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function QuizzesPage() {

    const [category, setCategory] = useState<string>('');

    const { data, isLoading, isError, error: serviceError, refetch } = useQuery({
        queryKey: ['quizzes'],
        queryFn: async () => {
            const res = await fetch('/api/quiz' + (category ? `?category=${category}` : ''), {
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
        return <Loading/>;
    }

    return (
        <main className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">Elérhető kvízek</h1>
                <Link href="/manage/new-quiz" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-200 hover:bg-slate-200/80 text-slate-900 shadow-sm cursor-pointer h-9 px-4 py-2">
                    <Icon.Add size={18} onlyStrokes strokeWidth={2} />
                    Készíts új kvízt
                </Link>
            </div>

            <div className="flex flex-wrap gap-2">

                <CategoryBadge title="Összes kategória" count={data?.categories.reduce((acc: number, category: any) => acc + category.count, 0)} isSelected={category === ''} onClick={() => setCategory('')} />
                {
                    data?.categories.map((c) => (
                        <CategoryBadge key={c._id} title={c._id} count={c.count} isSelected={c._id === category} onClick={() => setCategory(c._id)} />
                    ))
                }
            </div>

            <div className="grid lg:grid-cols-3 gap-6">

                {
                    data?.data.map((quiz) => (
                        <QuizCard key={quiz._id} title={quiz.title} description={quiz.description} difficulty={quiz.difficulty} questions={quiz.numberOfQuestions} time={quiz.time} rating={quiz.rating} taken={quiz.attempts} id={quiz._id} />
                    ))
                }
            </div>
        </main>
    )
}

function CategoryBadge({ title, count, isSelected, onClick }: { title: string; count: number; isSelected: boolean; onClick: () => void }) {
    return (
        <button className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${isSelected ? 'bg-slate-200 hover:bg-slate-200/80 text-slate-900' : 'border border-slate-600 hover:bg-slate-500/40 text-slate-200'} shadow-sm cursor-pointer h-9 px-4 py-2`} onClick={onClick}>
            {title}
            <div className="flex items-center justify-center px-3 p-1 bg-slate-950/80 text-xs text-slate-100 rounded-lg">
                {count}
            </div>
        </button>
    )
}

function QuizCard({ title, description, difficulty, questions, time, rating, taken, id }: { title: string; description: string; difficulty: string; questions: number; time: number; rating: number; taken: number; id: string }) {
    return (
        <div className="border border-slate-600/70 rounded-lg p-6 flex flex-col">
            <div className="flex items-center justify-between">
                {title}

                <DifficultyBadge level={difficulty} color="" />
            </div>
            <div className="w-full flex text-sm text-slate-600">
                {description}
            </div>

            <div className="mt-4 flex flex-col text-slate-200 gap-2 text-md">
                <div className="flex items-center gap-2 justify-between">
                    <span className="flex items-center">
                        <Icon.Comment onlyStrokes size={16} strokeWidth={2} className="me-1" />
                        {questions} kérdés
                    </span>
                    <span className="flex items-center">
                        <Icon.Time onlyStrokes size={16} strokeWidth={2} className="me-1" />
                        {time} perc
                    </span>
                </div>
                <div className="flex items-center gap-2 justify-between">
                    <span className="flex items-center">
                        <Icon.Group className="me-1" size={16} />
                        {taken} megoldva
                    </span>
                    <span className="flex items-center">
                        <Icon.Star size={16} strokeWidth={2} className="me-1 text-yellow-300" />
                        {rating}
                    </span>
                </div>
            </div>

            <div className="flex mt-4">
                <Link href={`/quizzes/${id}`} className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-200 hover:bg-slate-200/80 text-slate-900 shadow-sm cursor-pointer h-9 px-4 py-2">
                    <Icon.Play onlyStrokes size={16} strokeWidth={2} className="me-1" />
                    Kvíz indítása
                </Link>
            </div>
        </div>
    )
}

function DifficultyBadge({ level, color }: { level: string; color: string }) {
    if (level.toLocaleLowerCase() === "easy") color = "bg-green-200/90 text-green-900";
    if (level.toLocaleLowerCase() === "medium") color = "bg-yellow-200/90 text-yellow-900";
    if (level.toLocaleLowerCase() === "hard") color = "bg-red-300/90 text-red-900";

    return (
        <span className={`inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium ${color}`}>
            {level.charAt(0).toUpperCase() + level.slice(1)}
        </span>
    )
}