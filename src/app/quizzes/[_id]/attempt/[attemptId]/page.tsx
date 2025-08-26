"use client";
import Loading from "@/app/loading";
import { Icon } from "@/icons/Icon";
import { UserContext } from "@/services/user.context";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Attempt() {

    const id = useParams().attemptId;
    const [time, setTime] = useState(0);
    const { user } = useContext(UserContext);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { data, isLoading, isError, error: serviceError, refetch } = useQuery({
        queryKey: ['attempt', id],
        queryFn: async () => {
            const res = await fetch(`/api/quiz/${id}/attempt/${id}?attemptId=${id}`);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            return data.data;
        }
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if (data) {
                setTime(new Date(new Date().getTime() - new Date(data.startedAt).getTime()).getTime() / 1000);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [data]);

    if (isLoading) {
        return <Loading />;
    }

    if (!data) {
        return <div>No data found</div>;
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        setIsSubmitted(true);

        const answers = data.questions[data.answers.length].options.map((o) => e.target[o].checked ? o : null).filter((o) => o !== null);
        const res = await fetch(`/api/quiz/${data.quizId}/attempt/next?attemptId=${id}&quizId=${data.quizId}&playerId=${user._id}`, { method: 'POST', body: JSON.stringify({ answers }) });
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        setIsSubmitted(false);
        refetch();
    }

    function getTimeFormat(
        seconds: number
    ) {
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        return `${hours}:${(minutes % 60).toFixed(0).padStart(2, '0')}:${(seconds % 60).toFixed(0).padStart(2, '0')}`;
    }

    return (
        <main className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <Link href="/quizzes" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-slate-300 text-slate-300 shadow-sm hover:bg-slate-400/30 cursor-pointer h-9 px-4 py-2">
                    <Icon.Arrow.Left size={18} onlyStrokes strokeWidth={2} />
                    Vissza a kvízekhez
                </Link>

                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="text-3xl font-bold">{data.quizTitle}</div>
                    <div className="text-md text-slate-400">{data.answers.length + 1}. kérdés a {data.questions.length}-ból/ből</div>
                </div>

                <div className="flex gap-2 items-center">
                    <Icon.Time size={24} onlyStrokes strokeWidth={2} />
                    <span className="text-lg text-slate-200">{getTimeFormat(time)}</span>
                </div>
            </div>

            <div className="flex w-full relative">
                <section className="w-full rounded-full bg-slate-800 h-2"></section>
                <section style={{ width: `${(data.current + 1) / data.questions.length * 100}%` }} className="rounded-full bg-slate-200 h-2 absolute top-0 left-0"></section>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <QuestionCard isSubmitted={isSubmitted} question={data.questions[data.current].question} options={data.questions[data.current].options} answerLength={data.answers.length} />
            </form>
        </main>
    )
}


function QuestionCard({ question, options, answerLength, isSubmitted }: { question: string; options: string[]; answerLength: number; isSubmitted: boolean }) {

    const [isHint, setIsHint] = useState(false);

    return (
        <div className="flex flex-col gap-6 p-6 border border-slate-700 rounded-lg">
            <div className="text-xl font-semibold">{question}</div>

            <div className="flex flex-col gap-2">
                {options.map((option, index) => (
                    <QuestionAnswers isSubmitted={isSubmitted} key={index} option={option} />
                ))}
            </div>

            <div className="flex items-center w-full gap-1">
                <Icon.Info onClick={() => setIsHint(!isHint)} size={16} className="text-slate-400 cursor-pointer" />
                {
                    isHint &&
                    <span className="text-sm text-slate-400">
                        Segítség: {answerLength === 1 ? "Egy jó válasz van" : "Több jó válasz van."}
                    </span>
                }
            </div>

            <div className="flex justify-between w-full">
                <button disabled className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-slate-300 text-slate-300 shadow-sm hover:bg-slate-400/30 cursor-pointer h-9 px-4 py-2">
                    Előző
                </button>

                <button type="submit" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-400/80 text-slate-900 shadow-sm hover:bg-slate-400/70 cursor-pointer h-9 px-4 py-2">
                    Következő
                </button>
            </div>
        </div>
    )
}

function QuestionAnswers({ option, isSubmitted }: { option: string; isSubmitted: boolean }) {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        setIsChecked(false);
    }, [isSubmitted]);

    return (
        <label className={`flex items-center gap-2 w-full border border-slate-700 rounded-md p-4 text-slate-300 cursor-pointer ${isChecked ? "bg-slate-800" : ""} select-none duration-200 hover:bg-slate-800`} htmlFor={option}>
            <input checked={isChecked} type="checkbox" id={option} name="question" value={option} className="hidden" onChange={handleCheckboxChange} />
            {isChecked ? (
                <Icon.Check.Checked size={24} />
            ) : (
                <Icon.Check.NotChecked size={24} />
            )}
            {option}
        </label>
    )
}