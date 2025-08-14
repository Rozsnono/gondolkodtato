// app/api/users/route.ts
import clientPromise from '../../../lib/mongodb';
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
        const client = await clientPromise
        const db = client.db('gondolkodtato')

        const body = await req.json()

        if (!body.name || !body.password || !body.email) {
            return NextResponse.json({ error: 'Név, jelszó és email szükséges' }, { status: 400, headers: headers })
        }

        const register = await db.collection('players').insertOne({ name: body.name, password: body.password.toHexa(), email: body.email })

        if (!register) {
            return NextResponse.json({ error: 'Érvénytelen név vagy jelszó' }, { status: 401, headers: headers })
        }

        const resp = { ...register, password: null }

        return NextResponse.json({ success: true, player: resp }, { headers: headers });

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

declare global {
    interface String {
        toHexa(): string;
    }
}

String.prototype.toHexa = function (): string {
    return Array.from(this)
        .map(c => c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('');
};