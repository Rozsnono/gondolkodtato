// app/api/users/route.ts
import mongoose from 'mongoose';
import { NextResponse } from 'next/server'

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

        const results = await Promise.all(
            data.map(async (item: any) => {
                delete item.code;
                const formattedItem = {
                    ...item,
                    courseIds: item.courseIds.map((course: any) => course.id)
                };
                console.log(formattedItem);

                const tmpData = {
                    "subjectId": "2624512b-d33f-4c39-8fd2-6c378ceff9f1",
                    "termId": "4709ce70-1348-4b4e-9f76-e5f2f5632301",
                    "curriculumTemplateId": "cf0e8a39-6a04-45a5-81b9-b8d5a373a75d",
                    "curriculumTemplateLineId": "356cb7e5-fd77-4143-b09a-5e2ee7096961",
                    "courseIds": [
                        "55ab304d-ca1c-4aa1-b805-cacd28945b3c",
                        "76472e5d-6572-4ac6-8b01-7b1190140c85"
                    ]
                }

                const response = await fetch(
                    `https://neptun-hweb.sze.hu/hallgato_ng/api/SubjectApplication/SubjectSignin`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `${authToken}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(tmpData),
                    }
                );

                console.log(response);

                if (!response.ok) {
                    return { error: response.status, message: response.statusText };
                }

                const res = await response.json();

                return res;
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

