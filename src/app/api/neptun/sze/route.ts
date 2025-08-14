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

        const terms = await fetch("https://neptun-hweb.sze.hu/hallgato_ng/api/SubjectApplication/Terms", {
            method: 'GET',
            headers: {
                'Authorization': `${authToken}`,
            },
        });
        const termsData = await terms.json();

        if (!termsData || !termsData.data) {
            return NextResponse.json({ error: 'Nincs elérhető adat' }, { status: 404, headers: headers });
        }

        const subjectType = await fetch("https://neptun-hweb.sze.hu/hallgato_ng/api/SubjectApplication/SubjectTypes",
            {
                method: 'GET',
                headers: {
                    'Authorization': `${authToken}`,
                },
            }
        )
        const subjectTypeData = await subjectType.json();

        if (!subjectTypeData || !subjectTypeData.data) {
            return NextResponse.json({ error: 'Nincs elérhető adat' }, { status: 404, headers: headers });
        }

        const termId = new URL(req.url).searchParams.get('termId') || termsData.data[0].value;
        const curriculum = await fetch(`https://neptun-hweb.sze.hu/hallgato_ng/api/SubjectApplication/Curriculum?subjectType=1&termId=${termId}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `${authToken}`,
                },
            }
        )
        const curriculumData = await curriculum.json();

        if (!curriculumData || !curriculumData.data) {
            return NextResponse.json({ error: 'Nincs elérhető adat' }, { status: 404, headers: headers });
        }

        const curriculumId = new URL(req.url).searchParams.get('curriculumId') || curriculumData.data[0].value;
        const subjectGroup = await fetch(`https://neptun-hweb.sze.hu/hallgato_ng/api/SubjectApplication/SubjectGroup?subjectType=1&termId=${termId}&curriculumIds%5B0%5D=${curriculumId}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `${authToken}`,
                },
            }
        )
        const subjectGroupData = await subjectGroup.json();

        if (!subjectGroupData || !subjectGroupData.data) {
            return NextResponse.json({ error: 'Nincs elérhető adat' }, { status: 404, headers: headers });
        }

        return NextResponse.json({ success: true, termsData, subjectTypeData, curriculumData, subjectGroupData }, { headers: headers });

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

