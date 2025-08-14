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
    const quizId = new URL(req.url).searchParams.get('quizId') || '';


    if (!playerId) {
        return NextResponse.json(
            { error: 'Player ID is required' },
            { status: 500, headers }
        );
    }

    const attempt = await db.collection('attempts').findOne({ quizId, playerId });

    if (!attempt) {
        return NextResponse.json(
            { error: 'Attempt not found' },
            { status: 404, headers }
        );
    }

    await db.collection('attempts').updateOne({ _id: attempt._id }, { $set: { finishedAt: new Date() } });

    return NextResponse.json(attempt, { headers });
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
