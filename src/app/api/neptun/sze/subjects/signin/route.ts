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

                const response = await fetch(
                    `https://neptun-hweb.sze.hu/hallgato_ng/api/SubjectApplication/SubjectSignin`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `${authToken}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(formattedItem),
                    }
                );
                
                const res = await response.json();
                if (!response.ok) {
                    return { error: response.status, message: res.notification[0].description, item: item };
                }


                return res;
            })
        );






        return NextResponse.json({ results }, { headers: headers, status: results.some(r => r.error) ? 500 : 200 });

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

