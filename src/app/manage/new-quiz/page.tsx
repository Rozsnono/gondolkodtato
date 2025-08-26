"use client";
import { Icon } from "@/icons/Icon";
import { UserContext } from "@/services/user.context";
import { useContext, useState } from "react";

export default function AddQuizPage() {

    const { user } = useContext(UserContext);

    async function handleOnSubmit(e: any) {
        e.preventDefault();

        const formData: any = {
            title: e.target['quiz-title'].value,
            category: e.target['quiz-category'].value,
            difficulty: e.target['quiz-difficulty'].value.toLocaleLowerCase(),
            description: e.target['quiz-description'].value,
            questions: JSON.parse(e.target['quiz-file'].value),
            rating: parseFloat(e.target['quiz-rating'].value) || 5,
            time: parseFloat(e.target['quiz-time'].value) || 30,
            numberOfQuestions: parseFloat(e.target['quiz-questions'].value) || 15,
        };

        try {
            const res = await fetch('/api/quiz/create?playerId=' + (user?._id || ''), {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();
            if (res.ok) {
                console.log('Server response:', data);
            } else {
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="flex flex-col gap-6" >
            <h1 className="text-4xl font-bold">Kvíz hozzáadása</h1>

            <form onSubmit={handleOnSubmit} className="grid lg:grid-cols-2 grid-cols-1 lg:max-w-4xl w-full mx-auto gap-4 lg:p-6 p-2 border border-slate-600/30 rounded-lg">
                <TextInput label="Kvíz címe" placeholder="Írd be a kvíz címét..." className="lg:col-span-2" id="quiz-title" />
                <TextInput label="Kategória" id="quiz-category" placeholder="Írd be a kvíz kategóriáját..." className="lg:col-span-2" />
                <SelectInput label="Nehézség" options={["Easy", "Medium", "Hard"]} id="quiz-difficulty" />
                <NumberInput label="Átlagos kitöltésre szánt idő" id="quiz-time" defaultValue={30} unit={'Perc'}/>
                <NumberInput label="Feltehető kérdések száma" id="quiz-questions" defaultValue={15} unit={'db'}/>
                <AreaInput label="Kvíz leírása" placeholder="Írd be a kvíz leírását..." className="lg:col-span-2" id="quiz-description" />
                <FileInput label="Fájl feltöltése" id="quiz-file" />
                <RateInput label="Értékelés" id="quiz-rating" max={10} />

                <div className="flex justify-end col-span-2">
                    <button type="submit" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-200 hover:bg-slate-200/80 text-slate-900 shadow-sm cursor-pointer h-9 px-4 py-2">
                        <Icon.Add size={18} onlyStrokes strokeWidth={2} />
                        Kvíz mentése
                    </button>
                </div>
            </form>

            <div className="grid grid-cols-1 lg:max-w-4xl w-full mx-auto gap-4 lg:p-6 p-2 border border-slate-600/30 rounded-lg">
                <h1 className="text-xl font-bold">Kérdések formátuma</h1>
                <QuestionJSONFormat />
            </div>

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

function NumberInput({ label, id, min, max, defaultValue, unit }: { label: string; id: string; min?: number; max?: number; defaultValue?: number; unit?: string }) {
    return (
        <div className="w-full flex gap-1 flex-col">
            <label className="block text-sm font-medium text-slate-300">{label}</label>
            <div className="flex border border-slate-600 rounded-md ">
                <input id={id} type="number" min={min} max={max} defaultValue={defaultValue} className="border-r border-slate-600 rounded-l-md p-[.45rem] w-full bg-slate-900" />
                <span className="text-slate-400 text-sm flex items-center justify-center p-2">{unit}</span>
            </div>
        </div>
    );
}

function RateInput({ label, id, max }: { label: string; id: string; max: number }) {

    const [rating, setRating] = useState<number | null>(null);
    const [tempRating, setTempRating] = useState<number | null>(null);

    return (
        <div className="w-full flex gap-1 flex-col">
            <label className="block text-sm font-medium text-slate-300">{label}</label>
            <div className="flex gap-1 items-center p-1">
                {
                    new Array(max).fill(0).map((_, index) => (
                        <div key={index} className="relative group cursor-pointer" onClick={() => {setRating(index + 1); setTempRating(index + 1); }} onMouseEnter={() => setRating(index + 1)} onMouseLeave={() => setRating(tempRating)}>
                            <Icon.Star size={32} strokeWidth={2} className={`me-1 text-yellow-300 group-hover:opacity-0 opacity-100 duration-200 ${rating! >= index + 1 ? 'opacity-100' : 'opacity-0'}`} />
                            <Icon.StarFull size={32} strokeWidth={2} className={`me-1 text-yellow-300 group-hover:opacity-100 opacity-0 duration-200 absolute top-0 left-0 ${rating! >= index + 1 ? 'opacity-100' : 'opacity-0'}`} />
                        </div>
                    ))
                }
            </div>
            <input id={id} type="number" value={rating || ''} min={1} max={max} className="hidden" onChange={()=>{}}/>
        </div>
    );
}

function FileInput({ label, className, id }: { label: string; className?: string; id: string }) {

    const [value, setValue] = useState<string>('');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleFileChange(event: any) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                setValue((e.target!.result as string).replaceAll("\n", ""));
            } catch { }
        };
        reader.readAsText(file);
    };

    return (
        <div className={`w-full flex gap-1 flex-col ${className}`}>
            <label className="block text-sm font-medium text-slate-300">{label}</label>
            <input type="file" accept=".json" className="border border-slate-600 rounded-md p-2 w-full bg-slate-900" onChange={handleFileChange} />
            <span className="text-slate-400 text-sm">Figyelj a formátumra: .json, <b>maximum 5 MB</b></span>
            <textarea id={id} value={value} className="hidden" onChange={() => { }}></textarea>
        </div>
    );
}

function QuestionJSONFormat() {
    return (
        <pre className="bg-slate-800 p-4 rounded-md">
            {JSON.stringify({
                question: "Mi a fővárosa Magyarországnak?",
                options: [
                    'Budapest',
                    'Debrecen',
                    'Szeged'
                ],
                answers: [
                    'Budapest'
                ]
            }, null, 2)}
        </pre>
    );
}