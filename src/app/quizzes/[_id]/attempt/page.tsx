"use client";
import { Icon } from "@/icons/Icon";
import Link from "next/link";
import { useState } from "react";

export default function Attempt() {
    return (
        <main className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <Link href="/quizzes" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-slate-300 text-slate-300 shadow-sm hover:bg-slate-400/30 cursor-pointer h-9 px-4 py-2">
                    <Icon.Arrow.Left size={18} onlyStrokes strokeWidth={2} />
                    Vissza a kvízekhez
                </Link>

                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="text-3xl font-bold">Kvíz címe</div>
                    <div className="text-md text-slate-400">1. kérdés a 2-ből</div>
                </div>

                <div className="flex gap-2 items-center">
                    <Icon.Time size={24} onlyStrokes strokeWidth={2} />
                    <span className="text-lg text-slate-200">15:23</span>
                </div>
            </div>

            <div className="flex w-full relative">
                <section className="w-full rounded-full bg-slate-800 h-2"></section>
                <section className="w-1/2 rounded-full bg-slate-200 h-2 absolute top-0 left-0"></section>
            </div>

            <div className="flex flex-col gap-4">
                <QuestionCard />
            </div>
        </main>
    )
}


function QuestionCard() {
    return (
        <div className="flex flex-col gap-6 p-6 border border-slate-700 rounded-lg">
            <div className="text-xl font-semibold">Question Title</div>

            <div className="flex flex-col gap-2">
                <QuestionAnswers option="Answer 1" />
                <QuestionAnswers option="Answer 2" />
                <QuestionAnswers option="Answer 3" />
                <QuestionAnswers option="Answer 4" />
            </div>

            <div className="flex items-center w-full gap-1">
                <Icon.Info size={16} className="text-slate-400" />
                <span className="text-sm text-slate-400">
                    Hint: Think about the context
                </span>
            </div>

            <div className="flex justify-between w-full">
                <button disabled className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-slate-300 text-slate-300 shadow-sm hover:bg-slate-400/30 cursor-pointer h-9 px-4 py-2">
                    Előző
                </button>

                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-400/80 text-slate-900 shadow-sm hover:bg-slate-400/70 cursor-pointer h-9 px-4 py-2">
                    Következő
                </button>
            </div>
        </div>
    )
}

function QuestionAnswers({ option }: { option: string }) {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <label className={`flex items-center gap-2 w-full border border-slate-700 rounded-md p-4 text-slate-300 cursor-pointer ${isChecked ? "bg-slate-800" : ""} select-none duration-200`} htmlFor={option}>
            <input type="checkbox" id={option} name="question" value={option} className="hidden" onChange={handleCheckboxChange} />
            {isChecked ? (
                <Icon.Check.Checked size={24} />
            ) : (
                <Icon.Check.NotChecked size={24} />
            )}
            {option}
        </label>
    )
}