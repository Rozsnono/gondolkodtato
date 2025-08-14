// app/api/users/route.ts
import clientPromise from '../../../../lib/mongodb';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    const origin = req.headers.get('origin') || '*';

    const headers = {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    const client = await clientPromise;
    const db = client.db('gondolkodtato');
    const playerId = new URL(req.url).searchParams.get('playerId') || '';
    const id = new URL(req.url).searchParams.get('id') || '';

    const quizzes = await db.collection('quizzes').find({ _id: new mongoose.Types.ObjectId(id) }, { projection: { questions: 0 } }).toArray();

    return NextResponse.json({ data: quizzes }, { headers });
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
