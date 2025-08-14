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
        const subjectType = new URL(req.url).searchParams.get('subjectType');
        const curriculumId = new URL(req.url).searchParams.get('curriculumId');
        const subjectGroupId = new URL(req.url).searchParams.get('subjectGroupId');
        const title = new URL(req.url).searchParams.get('title');
        const from = new URL(req.url).searchParams.get('from');
        const to = new URL(req.url).searchParams.get('to');


        if (!termId || !subjectType || !curriculumId || !subjectGroupId || !from || !to) {
            return NextResponse.json({ error: 'Hiányzó kötelező paraméterek' }, { status: 400, headers: headers });
        }
        const subjects = await fetch(`https://neptun-hweb.sze.hu/hallgato_ng/api/SubjectApplication/SchedulableSubjects?request.termId=${termId}&request.subjectType=${subjectType}&request.hasRegisteredSubjects=true&request.hasScheduledSubjects=true&request.curriculumTemplateId=${curriculumId}&request.subjectGroupId=${subjectGroupId}&sortAndPage.firstRow=${from}&sortAndPage.lastRow=${to}&sortAndPage.title=asc${title ? `&request.title=${title}` : ''}`,
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

