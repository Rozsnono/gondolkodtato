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

        const body = await req.json();


        if (!body.userName || !body.password || !body.code) {
            return NextResponse.json({ error: 'Név és jelszó szükséges' }, { status: 400, headers: headers })
        }


        const res = await fetch('https://neptun3r.nyme.hu/hallgato/api/Account/Authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "userName": body.userName,
                "password": body.password,
                "captcha": "",
                "captchaIdentifier": "",
                "token": body.code,
                "LCID": 1038
            }),
        })

        const result = await res.json();
        if (!result || !result.data) {
            return NextResponse.json({ error: 'Érvénytelen név vagy jelszó' }, { status: 401, headers: headers })
        }
        return NextResponse.json({ success: true, token: result.data.accessToken }, { headers: headers });

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

