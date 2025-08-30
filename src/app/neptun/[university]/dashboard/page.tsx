"use client";
import Loading from "@/app/loading";
import { Icon } from "@/icons/Icon";
import { deleteToken, UserContext } from "@/services/user.context";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";

export default function NeptunPage() {

    const { neptun, setNeptun, setSavedSubjects, savedSubjects } = useContext(UserContext);
    const router = useRouter();

    const university = useParams().university;

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

    const [plannedSubjects, setPlannedSubjects] = useState<any[]>([]);
    const [subjects, setSubjects] = useState<any[]>([]);
    const [subjectIsOpen, setSubjectIsOpen] = useState(null);
    const [time, setTime] = useState(10000);
    const [logs, setLogs] = useState<any[]>([]);

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
            const res = await fetch('/api/neptun/'+university, {
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

    async function getSubjects() {
        const res = await fetch(`/api/neptun/${university}/subjects?termId=${formRef.current.termId}&subjectType=${formRef.current.subjectType}&curriculumId=${formRef.current.curriculum}&subjectGroupId=${formRef.current.subjectGroup}&title=${formRef.current.name}&from=${formRef.current.from}&to=${formRef.current.to}`, {
            headers: {
                'Authorization': `Bearer ${neptun?.token}`
            }
        });
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setSubjects(data.subjectData.data);
        setLogs([...logs, { time: new Date().toLocaleTimeString('hu-HU'), message: `${data.subjectData.data.length} tárgy betöltve ` }]);
    }

    if (isLoading) return <Loading />;

    if (isError) {
        setNeptun(null); deleteToken('neptun'); router.replace('/neptun');
    }

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

    function handleLoadMore() {
        formRef.current = {
            ...formRef.current,
            to: formRef.current.to + 10
        }
        getSubjects();
    }

    function handleSubjectClick(subject: any, course: any) {
        if (plannedSubjects.find(s => s.subjectId === subject.id)) {
            if (plannedSubjects.find(s => s.subjectId === subject.id).courseIds.find((c: any) => c.id === course.id)) {
                const tmp = plannedSubjects.find(s => s.subjectId === subject.id);
                const tmpArray = plannedSubjects.filter(s => s.subjectId !== subject.id);
                if (tmp.courseIds.length === 1) {
                    setPlannedSubjects([...tmpArray]);
                } else {
                    setPlannedSubjects([...tmpArray, { ...tmp, courseIds: tmp.courseIds.filter((c: any) => c.id !== course.id) }]);
                }
            } else {
                const tmp = plannedSubjects.find(s => s.subjectId === subject.id);
                const tmpArray = plannedSubjects.filter(s => s.subjectId !== subject.id);
                setPlannedSubjects([...tmpArray, { ...tmp, courseIds: [...tmp.courseIds, { id: course.id, code: course.code }] }]);
            }
        } else {
            setPlannedSubjects([...plannedSubjects, { subjectId: subject.id, curriculumTemplateId: subject.curriculumTemplateId, curriculumTemplateLineId: subject.curriculumTemplateLineId, termId: subject.termId, code: subject.code, courseIds: [{ id: course.id, code: course.code }] }]);
        }
        setLogs([...logs, { time: new Date().toLocaleTimeString('hu-HU'), message: `${plannedSubjects.find(s => s.subjectId === subject.id) && plannedSubjects.find(s => s.subjectId === subject.id).courseIds.find((c: any) => c.id === course.id) ? 'Eltávolítva' : 'Hozzáadva'} a ${subject.code} tárgyhoz a ${course.type} kurzus (${course.id})` }]);
    }

    function savePlannedSubjects() {
        const savedSubject = plannedSubjects.map(s => ({ subject: s.code, courses: s.courseIds.map((c: any) => c.code) }));
        setSavedSubjects(savedSubject);
        setLogs([...logs, { time: new Date().toLocaleTimeString('hu-HU'), message: `Tárgyak mentve: ${savedSubject.map(s => s.subject).join(', ')}` }]);
    }

    async function loadSavedSubjects() {
        if (savedSubjects.length === 0) return;
        const res = await fetch(`/api/neptun/${university}/subjects/course?termId=${formRef.current.termId}&subjectType=${formRef.current.subjectType}&curriculumId=${formRef.current.curriculum}&subjectGroupId=${formRef.current.subjectGroup}`, {
            headers: {
                'Authorization': `Bearer ${neptun?.token}`
            },
            method: 'POST',
            body: JSON.stringify(savedSubjects)
        });
        const data = await res.json();
        setPlannedSubjects(data.results);
        setLogs([...logs, { time: new Date().toLocaleTimeString('hu-HU'), message: `Tárgyak betöltve: ${data.results.map((s: any) => s.code).join(', ')}` }]);
    }

    async function handleSubjectSign() {
        const res = await fetch(`/api/neptun/${university}/subjects/signin`, {
            headers: {
                'Authorization': `Bearer ${neptun?.token}`
            },
            method: 'POST',
            body: JSON.stringify(plannedSubjects)
        });
        const data = await res.json();

        if (res.status === 200) {
            // Handle successful sign-in
        } else {
            data.results.forEach((result: any) => {
                setLogs([...logs, { time: new Date().toLocaleTimeString('hu-HU'), message: `Jelentkezés: ${result.error}:${result.message}` }]);
            })
        }
    }

    async function handleDeleteSubjects() {
        setPlannedSubjects([]);
        setSavedSubjects([]);
        setLogs([...logs, { time: new Date().toLocaleTimeString('hu-HU'), message: `Tárgyak törölve` }]);
    }

    return (

        <main className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">SZE Neptun</h1>
                <div onClick={() => { setNeptun(null); deleteToken('neptun'); router.replace('/neptun'); }} className="flex items-center gap-1 text-slate-300 group relative cursor-pointer hover:ring hover:ring-slate-400/20 hover:bg-slate-200/10 p-2 rounded-lg">
                    {neptun && neptun.loggedIn &&
                        new Date(neptun.loggedIn).toLocaleTimeString('hu-HU')
                    }
                    <Icon.Authorized size={24} />
                    <span className="text-sm opacity-100 group-hover:opacity-0 duration-200">Bejelentkezve</span>
                    <span className="text-sm group-hover:flex group-hover:opacity-100 opacity-0 duration-200 absolute right-2">Kijelentkezés</span>
                </div>
            </div>
            <main className="flex gap-3 lg:flex-row flex-col">
                <div className="flex flex-col gap-4">
                    {
                        !isLoading && data && !isError && data.termsData &&
                        <form onSubmit={handleFilterSubmit} className="border border-slate-800 p-6 flex lg:flex-row flex-col items-center gap-2 rounded-lg">
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
                                options={data.subjectGroupData.data.map((i: any) => { return { id: i.id, text: i.displayText } })}
                            />
                            <input type="text" id="name" placeholder="Tárgykód/név" className="bg-slate-900 border border-slate-600 rounded-lg p-2 w-full" />
                            <button type="submit" className="bg-slate-100/50 text-white rounded-lg p-2 cursor-pointer hover:bg-slate-100/30 flex items-center">
                                <Icon.Search size={20} className="inline-block mr-2" />
                                <span>Keresés</span>
                            </button>
                        </form>
                    }




                    <div className="border border-slate-800 p-4 px-6 flex lg:flex-row flex-col items-center lg:justify-between justify-center rounded-lg gap-3">
                        <div className="flex items-center gap-3 ">
                            <span className="text-sm text-slate-300">Összesen: 0 találat</span>
                        </div>

                        <div className="flex items-center gap-3 ">
                            <span className="text-sm text-slate-300 border border-slate-600/50 p-3 px-6 rounded-lg">Kreditek: 0 találat</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <button onClick={handleSubjectSign} className="bg-purple-500/80 text-white rounded-lg p-2 px-4 cursor-pointer hover:bg-purple-500/50 flex items-center">
                                <Icon.LogIn size={20} className="inline-block mr-2" />
                                <span>Jelentkezés</span>
                            </button>
                            <button className="bg-orange-500/80 text-white rounded-lg p-2 px-4 cursor-pointer hover:bg-orange-500/50 flex items-center">
                                <Icon.Book size={20} className="inline-block mr-2" />
                                <span>Tematikák</span>
                            </button>
                        </div>
                    </div>

                    <div className="border border-slate-800 p-6 flex flex-col gap-2 rounded-lg">
                        <h2 className="text-lg font-semibold flex items-center">
                            <Icon.Book size={20} className="inline-block mr-2" />
                            Elérhető tárgyak
                        </h2>

                        <div className="flex flex-col w-full gap-2">
                            {subjects.map((subject) => (
                                <SubjectCard courseChecked={(plannedSubjects.find(c => c.subjectId === subject.id) || { courseIds: [] })?.courseIds} onCourseCheck={(c) => { handleSubjectClick(subject, c) }} isOpen={subjectIsOpen} setIsOpen={(e) => { setSubjectIsOpen(e) }} key={subject.id} id={subject.id} name={subject.title} type={subject.type} kredit={subject.credit} requirementType={subject.requirementType} code={subject.code} termId={subject.termId} curriculumId={subject.curriculumTemplateId} curriculumLineId={subject.curriculumTemplateLineId} />
                            ))}

                        </div>

                        <div className="flex items-center gap-3 mx-auto">
                            <button onClick={handleLoadMore} className="bg-blue-500/80 text-white rounded-lg p-2 px-4 cursor-pointer hover:bg-blue-500/50 flex items-center">
                                <Icon.Load size={20} className="inline-block mr-2" />
                                <span>Továbbiak betöltése</span>
                            </button>
                        </div>
                    </div>

                    <div className="border border-slate-800 p-4 px-6 flex lg:flex-row flex-col items-center lg:justify-between justify-center rounded-lg gap-3">
                        <div className="flex items-center gap-3">
                            <button onClick={handleDeleteSubjects} className="bg-red-500/80 text-white rounded-lg p-2 px-4 cursor-pointer hover:bg-red-500/50 flex items-center">
                                <Icon.Reset size={20} className="inline-block mr-2" />
                                <span>Törlés</span>
                            </button>
                        </div>

                        <div className="flex items-center gap-3">
                            <button onClick={() => savePlannedSubjects()} className="bg-emerald-500/80 text-white rounded-lg p-2 px-4 cursor-pointer hover:bg-emerald-500/50 flex items-center">
                                <Icon.Upload size={20} className="inline-block mr-2" onlyStrokes strokeWidth={2} />
                                <span>Mentés</span>
                            </button>
                            <button onClick={() => loadSavedSubjects()} className="bg-sky-500/80 text-white rounded-lg p-2 px-4 cursor-pointer hover:bg-sky-500/50 flex items-center">
                                <Icon.Download size={20} className="inline-block mr-2" onlyStrokes strokeWidth={2} />
                                <span>Betöltés</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 min-w-80">

                    <div className="border border-slate-800 p-6 flex flex-col gap-2 rounded-lg ">
                        <h4 className="text-lg font-semibold flex items-center">
                            <Icon.Book size={20} className="inline-block mr-2" />
                            Fontos események
                        </h4>
                        <div className="flex flex-col gap-2 bg-slate-800/50 p-3 rounded-lg h-full overflow-y-auto">
                            {
                                logs.map((log, index) => (
                                    <span className="text-sm text-slate-300" key={index}>{log.time} | {log.message}</span>
                                ))
                            }
                            {
                                logs.length === 0 && (
                                    <span className="text-sm text-slate-300">Nincs esemény</span>
                                )
                            }
                        </div>
                    </div>
                </div>
            </main>
        </main>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SelectInput({ id, options, defaultValue }: { id: string; options: any[]; defaultValue?: string }) {
    return (
        <select id={id} defaultValue={defaultValue} className="bg-slate-900 border border-slate-600 rounded-lg p-2 w-full">
            {options.map((option, index) => (
                <option key={option.value + '' + index} value={option.value}>
                    {option.text}
                </option>
            ))}
        </select>
    );
}

function SubjectCard({ id, name, type, kredit, requirementType, code, isOpen, setIsOpen, termId, curriculumId, curriculumLineId, onCourseCheck, courseChecked }: { id: string; name: string; type: string; kredit: number; requirementType: string; code: string; isOpen: any; setIsOpen: (isOpen: any) => void, termId: string, curriculumId: string, curriculumLineId: string, onCourseCheck: (courseId: string) => void, courseChecked: any[] }) {

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
        <main className={`flex flex-col p-4 bg-slate-800/50 rounded-lg ${courseChecked.length > 0 ? 'ring-2 ring-emerald-500' : ''}`}>
            <main className="flex justify-between items-center">
                <div className="w-2/3">
                    <h3 className="text-lg font-semibold">{name}</h3>
                </div>
                <div className="lg:flex hidden items-center justify-center gap-1 w-full">
                    <span className="text-sm text-slate-400">{kredit} kredit</span>
                    <span className="h-1 w-1 bg-slate-600 rounded-full"></span>
                    <span className="text-sm text-slate-400">{requirementType}</span>
                    <span className="h-1 w-1 bg-slate-600 rounded-full"></span>
                    <span className="text-sm text-slate-400">{code}</span>
                    <span className="h-1 w-1 bg-slate-600 rounded-full"></span>
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
                                <div key={type} className="lg:p-4 p-1 rounded-lg">
                                    <h4 className="text-lg font-semibold">{type}</h4>
                                    <div className="flex flex-col gap-2 mt-2">
                                        {
                                            subjectCourseDatas.filter(item => item.type === type).map(course => (
                                                <div key={course.id} className="p-4 bg-slate-900/20 border border-slate-700/50 rounded-lg flex items-center justify-between">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-lg text-slate-200">{course.registeredStudentsCount} / {course.maxLimit}</p>
                                                            <p className="text-sm text-slate-400">{course.room}</p>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Icon.Time size={16} onlyStrokes strokeWidth={2} className="text-slate-400" />
                                                            <p className="text-sm text-slate-400 flex flex-col">{course.classInstanceInfos.map((info: any) => <span key={info.startTime}>{info.dayOfWeekText} {info.startTime} - {info.endTime}</span>)}</p>
                                                        </div>
                                                        <h4 className="text-lg font-semibold">{course.tutorName}</h4>
                                                    </div>

                                                    {
                                                        courseChecked.find(c => c.id === course.id) ? (
                                                            <Icon.Check.Checked className="cursor-pointer" onClick={() => onCourseCheck(course)} size={24} />
                                                        ) : (
                                                            <Icon.Check.NotChecked className="cursor-pointer" onClick={() => onCourseCheck(course)} size={24} />
                                                        )
                                                    }
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