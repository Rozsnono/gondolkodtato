// app/api/users/route.ts
import mongoose from 'mongoose';
import { NextResponse } from 'next/server'


export async function GET(req: Request) {
    const origin = req.headers.get('origin') || '*';

    const headers = {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    try {

        const authToken = req.headers.get('Authorization') || '';

        const termId = new URL(req.url).searchParams.get('termId');
        const subjectId = new URL(req.url).searchParams.get('subjectId');
        const curriculumId = new URL(req.url).searchParams.get('curriculumId');
        const curriculumLineId = new URL(req.url).searchParams.get('curriculumLineId');


        if (!termId || !subjectId || !curriculumId || !curriculumLineId) {
            return NextResponse.json({ error: 'Hiányzó kötelező paraméterek' }, { status: 400, headers: headers });
        }
        const subjects = await fetch(`https://neptun-hweb.sze.hu/hallgato_ng/api/SubjectApplication/GetSubjectsCourses?termId=${termId}&subjectId=${subjectId}&curriculumTemplateId=${curriculumId}&curriculumTemplateLineId=${curriculumLineId}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `${authToken}`,
                },
            }
        )
        const subjectData = await subjects.json();

        if (!subjectData) {
            return NextResponse.json({ error: 'Nincs elérhető adat' }, { status: 404, headers: headers });
        }

        return NextResponse.json({ success: true, subjectData }, { headers: headers });

    } catch (error) {
        console.error('Hiba a POST során:', error);
        return NextResponse.json({ error: 'Szerverhiba' }, { status: 500, headers: headers });
    }
}

export async function POST(req: Request) {
    const origin = req.headers.get('origin') || '*';

    const headers = {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    try {

        const authToken = req.headers.get('Authorization') || '';

        const data = await req.json();


        if (data.length === 0) {
            return NextResponse.json({ error: 'Hiányzó kötelező paraméterek' }, { status: 400, headers: headers });
        }

        const termId = new URL(req.url).searchParams.get('termId');
        const subjectType = new URL(req.url).searchParams.get('subjectType');
        const curriculumId = new URL(req.url).searchParams.get('curriculumId');
        const subjectGroupId = new URL(req.url).searchParams.get('subjectGroupId');

        const results = await Promise.all(
            data.map(async (item: any) => {
                const title = item.subject;

                const response = await fetch(
                    `https://neptun-hweb.sze.hu/hallgato_ng/api/SubjectApplication/SchedulableSubjects?request.termId=${termId}&request.subjectType=${subjectType}&request.hasRegisteredSubjects=true&request.hasScheduledSubjects=true&request.curriculumTemplateId=${curriculumId}&request.subjectGroupId=${subjectGroupId}&sortAndPage.title=asc&request.title=${title}`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `${authToken}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`Hiba a lekérésnél: ${response.status}`);
                }

                const res = await response.json();
                const data = res.data[0];

                const courses = await fetch(`https://neptun-hweb.sze.hu/hallgato_ng/api/SubjectApplication/GetSubjectsCourses?termId=${data.termId}&subjectId=${data.id}&curriculumTemplateId=${data.curriculumTemplateId}&curriculumTemplateLineId=${data.curriculumTemplateLineId}`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `${authToken}`,
                        },
                    }
                )
                const resCourses = await courses.json();
                const courseData = resCourses.data || [];


                return {
                    subjectId: data.id,
                    code: data.code,
                    termId: data.termId,
                    curriculumTemplateId: data.curriculumTemplateId,
                    curriculumTemplateLineId: data.curriculumTemplateLineId,
                    courseIds: courseData.filter((course: any) => item.courses.includes(course.code)).map((course: any) => ({
                        id: course.id,
                        code: course.code,
                    })),
                };
            })
        );






        return NextResponse.json({ success: true, results }, { headers: headers });

    } catch (error) {
        console.error('Hiba a POST során:', error);
        return NextResponse.json({ error: 'Szerverhiba' }, { status: 500, headers: headers });
    }
}

// Optional: Handle preflight OPTIONS request
export async function OPTIONS(req: Request) {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': req.headers.get('origin') || '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}

