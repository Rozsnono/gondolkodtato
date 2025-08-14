"use client";
import { Icon } from "@/icons/Icon";
import { deleteToken, UserContext } from "@/services/user.context";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";

export default function NeptunPage() {

    const { neptun, setNeptun } = useContext(UserContext);
    const router = useRouter();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formRef = useRef<any>({
        termId: '',
        subjectType: '',
        curriculum: '',
        subjectGroup: '',
        name: '',
        from: 0,
        to: 10
    });

    const [time, setTime] = useState(10000);

    useEffect(() => {
        if (neptun && !neptun.token) {
            router.push('/neptun');
        }
        console.log(neptun)
    }, [neptun]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (neptun && neptun.loggedIn) {
                setTime(new Date().getTime() - neptun.loggedIn);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const { data, isLoading, isError, error: serviceError, refetch } = useQuery({
        queryKey: ['neptun-sze-filters'],
        queryFn: async () => {
            const res = await fetch('/api/neptun/sze', {
                headers: {
                    'Authorization': `Bearer ${neptun?.token}`
                }
            });
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        }
    });

    const [subjects, setSubjects] = useState<any[]>([]);

    const [subjectIsOpen, setSubjectIsOpen] = useState(null);

    async function getSubjects() {
        const res = await fetch(`/api/neptun/sze/subjects?termId=${formRef.current.termId}&subjectType=${formRef.current.subjectType}&curriculumId=${formRef.current.curriculum}&subjectGroupId=${formRef.current.subjectGroup}&title=${formRef.current.name}&from=${formRef.current.from}&to=${formRef.current.to}`, {
            headers: {
                'Authorization': `Bearer ${neptun?.token}`
            }
        });
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setSubjects(data.subjectData.data);
    }

    if (isLoading) return <div>Loading...</div>;

    if (isError) {
        setNeptun(null); deleteToken('neptun'); router.replace('/neptun');
    }

    //  {
    //             "subjectGroup": "Választható tantárgycsoport",
    //             "type": "Választható törzsanyag",
    //             "semester": 0,
    //             "maxSemester": null,
    //             "minSemester": null,
    //             "curriculumTemplateName": "Mérnökinformatikus (BSc) mintatanterv 2020",
    //             "id": "523ae411-8d79-4e97-b0f0-fc01e26e2302",
    //             "title": "A vasút világa",
    //             "code": "EKNB_KOTM110",
    //             "credit": 3,
    //             "isWaiting": false,
    //             "isCompleted": false,
    //             "isRegistered": false,
    //             "indexlineId": null,
    //             "requirementType": "Folyamatos számonkérés",
    //             "isSubjectTematicsDownloadEnabled": true,
    //             "isInProgress": false,
    //             "scheduledSubjectId": null,
    //             "isScheduled": false,
    //             "courses": [],
    //             "note": "",
    //             "termId": "2fe6297b-1acc-4e28-b4cc-42d8d1d38fb2",
    //             "scheduledCoursesCount": 0,
    //             "curriculumTemplateLineId": "55cf0c84-fc2f-498a-8104-05832535645a",
    //             "curriculumTemplateId": "898c58d4-cb2d-482c-bbb3-d23381f2adb1",
    //             "uiDisplayState": {
    //                 "type": 0,
    //                 "reasons": []
    //             }
    //         },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleFilterSubmit(event: any) {
        event.preventDefault();

        formRef.current = {
            ...formRef.current,
            termId: event.target['term'].value,
            subjectType: event.target['subjectType'].value,
            curriculum: event.target['curriculum'].value,
            subjectGroup: event.target['subjectGroup'].value,
            name: event.target['name'].value,
        }

        getSubjects();
    }


    return (
        <main className="flex flex-col">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">SZE Neptun</h1>
                <div onClick={() => { setNeptun(null); deleteToken('neptun'); router.replace('/neptun'); }} className="flex items-center gap-1 text-slate-300 group relative cursor-pointer hover:ring hover:ring-slate-400/20 hover:bg-slate-200/10 p-2 rounded-lg">
                    <Icon.Authorized size={24} />
                    <span className="text-sm opacity-100 group-hover:opacity-0 duration-200">Bejelentkezve</span>
                    <span className="text-sm group-hover:flex group-hover:opacity-100 opacity-0 duration-200 absolute right-2">Kijelentkezés</span>
                </div>
            </div>

            {
                !isLoading && data && !isError &&
                <form onSubmit={handleFilterSubmit} className="border border-slate-800 mt-4 p-6 flex items-center gap-2 rounded-lg">
                    <SelectInput
                        id="term"
                        options={data.termsData.data}
                    />
                    <SelectInput
                        id="subjectType"
                        options={data.subjectTypeData.data}
                    />
                    <SelectInput
                        id="curriculum"
                        options={data.curriculumData.data}
                    />
                    <SelectInput
                        id="subjectGroup"
                        options={data.subjectGroupData.data}
                    />
                    <input type="text" id="name" placeholder="Tárgykód/név" className="bg-slate-900 border border-slate-600 rounded-lg p-2 w-full" />
                    <button type="submit" className="bg-slate-100/50 text-white rounded-lg p-2 cursor-pointer hover:bg-slate-100/30 flex items-center">
                        <Icon.Search size={20} className="inline-block mr-2" />
                        <span>Keresés</span>
                    </button>
                </form>
            }




            <div className="border border-slate-800 mt-4 p-4 px-6 flex items-center gap-2 rounded-lg justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-300">Összesen: 0 találat</span>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-300 border border-slate-600/50 p-3 px-6 rounded-lg">Kreditek: 0 találat</span>
                </div>

                <div className="flex items-center gap-3">
                    <button className="bg-purple-500/80 text-white rounded-lg p-2 px-4 cursor-pointer hover:bg-purple-500/50 flex items-center">
                        <Icon.LogIn size={20} className="inline-block mr-2" />
                        <span>Jelentkezés</span>
                    </button>
                    <button className="bg-orange-500/80 text-white rounded-lg p-2 px-4 cursor-pointer hover:bg-orange-500/50 flex items-center">
                        <Icon.Book size={20} className="inline-block mr-2" />
                        <span>Tematikák</span>
                    </button>
                </div>
            </div>

            <div className="border border-slate-800 mt-4 p-6 flex flex-col gap-2 rounded-lg">
                <h2 className="text-lg font-semibold flex items-center">
                    <Icon.Book size={20} className="inline-block mr-2" />
                    Elérhető tárgyak - {data?.termsData.data.find((term: any) => term.value === formRef.current.termId)?.text || 'Nincs kiválasztva'}
                </h2>

                <div className="flex flex-col w-full gap-2">
                    {subjects.map((subject) => (
                        <SubjectCard isOpen={subjectIsOpen} setIsOpen={(e) => { setSubjectIsOpen(e) }} key={subject.id} id={subject.id} name={subject.title} type={subject.type} kredit={subject.credit} requirementType={subject.requirementType} code={subject.code} termId={subject.termId} curriculumId={subject.curriculumTemplateId} curriculumLineId={subject.curriculumTemplateLineId} />
                    ))}

                </div>
            </div>

            <div className="border border-slate-800 mt-4 p-6 flex items-center gap-2 rounded-lg justify-between">
                <div className="flex items-center gap-3">
                    <button className="bg-red-500/80 text-white rounded-lg p-2 px-4 cursor-pointer hover:bg-red-500/50 flex items-center">
                        <Icon.Reset size={20} className="inline-block mr-2" />
                        <span>Törlés</span>
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button className="bg-emerald-500/80 text-white rounded-lg p-2 px-4 cursor-pointer hover:bg-emerald-500/50 flex items-center">
                        <Icon.Upload size={20} className="inline-block mr-2" onlyStrokes strokeWidth={2} />
                        <span>Mentés</span>
                    </button>
                    <button className="bg-sky-500/80 text-white rounded-lg p-2 px-4 cursor-pointer hover:bg-sky-500/50 flex items-center">
                        <Icon.Download size={20} className="inline-block mr-2" onlyStrokes strokeWidth={2} />
                        <span>Betöltés</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">

                <div className="border border-slate-800 mt-4 p-6 flex flex-col gap-2 rounded-lg">
                    <h4 className="text-lg font-semibold flex items-center">
                        <Icon.Book size={20} className="inline-block mr-2" />
                        Tárgyakkal kapcsolatos események
                    </h4>
                    <div className="flex flex-col gap-2 bg-slate-800/50 p-3 rounded-lg max-h-[20rem] overflow-y-auto">
                        <span className="text-sm text-slate-300">2024.02.15. 12:00 - 2024.02.15. 12:30</span>
                    </div>
                </div>

                <div className="border border-slate-800 mt-4 p-6 flex flex-col gap-2 rounded-lg">
                    <h4 className="text-lg font-semibold flex items-center">
                        <Icon.Book size={20} className="inline-block mr-2" />
                        Jelentkezési események
                    </h4>
                    <div className="flex flex-col gap-2 bg-slate-800/50 p-3 rounded-lg max-h-[20rem] overflow-y-auto">
                        <span className="text-sm text-slate-300">2024.02.15. 12:00 - 2024.02.15. 12:30</span>
                    </div>
                </div>
            </div>
        </main>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SelectInput({ id, options, defaultValue }: { id: string; options: any[]; defaultValue?: string }) {
    return (
        <select id={id} defaultValue={defaultValue} className="bg-slate-900 border border-slate-600 rounded-lg p-2 w-full">
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.text}
                </option>
            ))}
        </select>
    );
}

function SubjectCard({ id, name, type, kredit, requirementType, code, isOpen, setIsOpen, termId, curriculumId, curriculumLineId }: { id: string; name: string; type: string; kredit: number; requirementType: string; code: string; isOpen: any; setIsOpen: (isOpen: any) => void, termId: string, curriculumId: string, curriculumLineId: string }) {

    const [subjectCourseDatas, setSubjectCourseDatas] = useState<any[]>([]);
    const { neptun } = useContext(UserContext);


    async function getSubjectCourseDatas() {
        const response = await fetch(`/api/neptun/sze/subjects/course?termId=${termId}&subjectId=${id}&curriculumId=${curriculumId}&curriculumLineId=${curriculumLineId}`,
            {
                headers: {
                    'Authorization': `Bearer ${neptun?.token}`,
                },
            }
        );
        const data = await response.json();
        setSubjectCourseDatas(data.subjectData.data);
        setIsOpen(isOpen === id ? null : id)
    }

    return (
        <main className="flex flex-col p-4 bg-slate-800/50 rounded-lg">
            <main className="flex justify-between items-center">
                <div className="w-2/3">
                    <h3 className="text-lg font-semibold">{name}</h3>
                </div>
                <div className="flex items-center justify-center gap-1 w-full">
                    <span className="text-sm text-slate-400">{kredit} kredit</span>
                    <span className="h-1 w-1 bg-slate-600 rounded-full"></span>
                    <span className="text-sm text-slate-400">{requirementType}</span>
                    <span className="h-1 w-1 bg-slate-600 rounded-full"></span>
                    <span className="text-sm text-slate-400">{code}</span>
                </div>
                <div className="" >
                    <Icon.Chevron.Down size={24} className={`cursor-pointer ${isOpen === id ? 'rotate-180' : ''} duration-200`} onClick={getSubjectCourseDatas} />
                </div>
            </main>
            {
                isOpen === id && (
                    <div className="mt-6 flex flex-col w-full gap-2">


                        {
                            [...new Set(subjectCourseDatas.map(item => item.type))].map((type) => (
                                <div key={type} className="p-4 rounded-lg">
                                    <h4 className="text-lg font-semibold">{type}</h4>
                                    <div className="flex flex-col gap-2 mt-2">
                                        {
                                            subjectCourseDatas.filter(item => item.type === type).map(course => (
                                                <div key={course.id} className="p-4 bg-slate-900/20 border border-slate-700/50 rounded-lg">
                                                    <h4 className="text-lg font-semibold">{course.tutorName}</h4>
                                                    <p className="text-sm text-slate-400">{course.room}</p>

                                                    <p className="text-sm text-slate-400 flex flex-col">{course.classInstanceInfos.map((info: any) => <span key={info.startTime}>{info.dayOfWeekText} {info.startTime} - {info.endTime}</span>)}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                )
            }
        </main>
    )
}