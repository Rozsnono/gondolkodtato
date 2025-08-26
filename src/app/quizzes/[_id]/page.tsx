"use client"
import Loading from "@/app/loading";
import { Icon } from "@/icons/Icon";
import { UserContext } from "@/services/user.context";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";

export default function QuizPage() {

    const id = useParams()._id;
    const router = useRouter();

    const { user } = useContext(UserContext);

    const { data, isLoading, isError, error: serviceError, refetch } = useQuery({
        queryKey: ['quizzes', id],
        queryFn: async () => {
            const res = await fetch('/api/quiz/' + id + "?id=" + id);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        }
    });

    if (isLoading) {
        return <Loading />;
    }

    async function AttemptQuiz() {
        const res = await fetch(`/api/quiz/${id}/attempt?quizId=${id}&playerId=${user._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        router.push(`/quizzes/${id}/attempt/${data.resultId}`);
    }

    return (
        <main className="flex flex-col gap-6">
            <div className="border border-slate-600/70 rounded-lg p-6 flex flex-col w-2xl mx-auto">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-semibold">{data.data[0].title}</h2>

                    <DifficultyBadge level={data.data[0].difficulty} color="" />
                </div>
                <div className="w-full flex text-sm text-slate-600 mt-2">
                    {
                        data.data[0].description
                    }
                </div>

                <div className="mt-4 flex flex-col text-slate-200 gap-2 text-xl">
                    <div className="flex items-center gap-2 justify-between">
                        <span className="flex items-center">
                            <Icon.Comment onlyStrokes size={24} strokeWidth={2} className="me-1" />
                            {data.data[0].numberOfQuestions} kérdés
                        </span>
                        <span className="flex items-center">
                            <Icon.Time onlyStrokes size={24} strokeWidth={2} className="me-1" />
                            {data.data[0].time} perc
                        </span>
                    </div>
                    <div className="flex items-center gap-2 justify-between">
                        <span className="flex items-center">
                            <Icon.Group className="me-1" size={24} />
                            {data.data[0].attempts} megoldott
                        </span>
                        <span className="flex items-center">
                            <Icon.Star size={24} strokeWidth={2} className="me-1 text-yellow-300" />
                            {data.data[0].rating}
                        </span>
                    </div>
                </div>

                <div className="flex mt-4">
                    <button onClick={AttemptQuiz} className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-200 hover:bg-slate-200/80 text-slate-900 shadow-sm cursor-pointer h-9 px-4 py-2">
                        <Icon.Play onlyStrokes size={16} strokeWidth={2} className="me-1" />
                        Kvíz indítása
                    </button>
                </div>
            </div>
        </main>
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