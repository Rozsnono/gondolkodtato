"use client";
import Loading from "@/app/loading";
import { Icon } from "@/icons/Icon";
import { UserContext } from "@/services/user.context";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { JSX, useContext, useMemo } from "react";

export default function AnswerCheckPage() {
    const params = useParams();
    const attemptId = params.attemptId as string;
    const quizId = params._id as string;
    const { user } = useContext(UserContext);
    const router = useRouter();

    const { data, isLoading } = useQuery(
        {
            queryKey: ["attempt-check", attemptId],
            queryFn: async () => {
                const res = await fetch(`/api/quiz/${attemptId}/attempt/${attemptId}?attemptId=${attemptId}`);
                if (!res.ok) throw new Error("Network response was not ok");
                const json = await res.json();
                return json.data as AttemptDoc;
            },
        });

    const score = useMemo(() => {
        if (!data) return { correct: 0, total: 0, percentage: 0 };
        const correct = (data.answers || []).filter((a) => a.isCorrect).length;
        const total = data.questions.length;
        const percentage = total ? Math.round((correct / total) * 100) : 0;
        return { correct, total, percentage };
    }, [data]);

    if (isLoading || !data) { return <Loading />; }

    function getSelectedFor(index: number) {
        return data!.answers.find((a) => a.current === index)?.answers || [];
    }

    async function handleRetake() {
        const res = await fetch(`/api/quiz/${quizId}/attempt?quizId=${quizId}&playerId=${user?._id || ""}`,
            { method: "POST", headers: { "Content-Type": "application/json" }, });
        if (!res.ok) return;
        const json = await res.json();
        router.push(`/quizzes/${quizId}/attempt/${json.resultId}`);
    }

    return (<main className="flex flex-col gap-6"> <div className="flex items-center justify-between"> <Link href="/quizzes" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-slate-300 text-slate-300 shadow-sm hover:bg-slate-400/30 cursor-pointer h-9 px-4 py-2" > <Icon.Arrow.Left size={18} onlyStrokes strokeWidth={2} /> Vissza a kvízekhez </Link>
        <div className="flex flex-col items-center justify-center gap-2">
            <div className="text-3xl font-bold">Eredmény</div>
            <div className="text-md text-slate-400">{data.quizTitle}</div>
        </div>

        <div className="flex gap-2 items-center">
            <Icon.Trophy size={24} />
            <span className="text-lg text-slate-200">
                {score.correct}/{score.total} ({score.percentage}%)
            </span>
        </div>
    </div>

        <div className="flex gap-2">
            <button
                onClick={() => router.push("/quizzes")}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-slate-300 text-slate-300 shadow-sm hover:bg-slate-400/30 cursor-pointer h-9 px-4 py-2"
            >
                <Icon.Home size={16} /> Főoldal
            </button>
            <button
                onClick={handleRetake}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-200 hover:bg-slate-200/80 text-slate-900 shadow-sm cursor-pointer h-9 px-4 py-2"
            >
                <Icon.Reset size={16} /> Újrakezdés
            </button>
        </div>

        <section className="flex flex-col gap-4">
            {data.questions.map((q, idx) => (
                <QuestionReview
                    key={idx}
                    index={idx}
                    question={q.question}
                    options={q.options}
                    correct={q.answers}
                    selected={getSelectedFor(idx)}
                />
            ))}
        </section>
    </main>
    )
}

type AttemptDoc = { _id: string; quizId: string; quizTitle: string; startedAt: string; finishedAt: string | null; current: number; questions: { question: string; options: string[]; answers: string[] }[]; answers: { current: number; answers: string[]; isCorrect: boolean }[]; };

function QuestionReview({ index, question, options, correct, selected, }: { index: number; question: string; options: string[]; correct: string[]; selected: string[]; }) {
    return (
        <div className="flex flex-col gap-4 p-6 border border-slate-700 rounded-lg">
            <div className="text-lg font-semibold"> {index + 1}. {question} </div>
            <div className="flex flex-col gap-2"> {options.map((opt) => (<AnswerRow key={opt} option={opt} correct={correct} selected={selected} />))} </div>
        </div>
    );
}

function AnswerRow({ option, correct, selected, }: { option: string; correct: string[]; selected: string[]; }) {
    const isCorrect = correct.includes(option);
    const isSelected = selected.includes(option);
    let classes = "border-slate-700";
    let icon: JSX.Element = <Icon.Check.NotChecked size={20} />;

    if (isCorrect && isSelected) {
        classes = "border-green-500 bg-green-500/10"; icon = <Icon.Star size={20} />;
    } else if (!isCorrect && isSelected) {
        classes = "border-red-500 bg-red-500/10"; icon = <Icon.Close size={20} />;
    } else if (isCorrect && !isSelected) {
        classes = "border-orange-600 bg-orange-600/10"; icon = <Icon.Check.NotChecked size={20} />;
    }

    return (<div className={`flex items-center gap-2 w-full border rounded-md p-3 ${classes}`}> {icon} <span className="text-slate-200">{option}</span> </div>);
}