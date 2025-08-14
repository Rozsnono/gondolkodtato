// app/api/users/route.ts
import clientPromise from '../../../../lib/mongodb';
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
        const playerId = new URL(req.url).searchParams.get('playerId') || '';

        const body = await req.json();

        const result = await db.collection('quizzes').insertOne({
            _id: new mongoose.Types.ObjectId(),
            createdBy: playerId,
            createdAt: new Date(),
            title: body.title,
            category: body.category,
            difficulty: body.difficulty,
            description: body.description,
            questions: body.questions,
            rating: body.rating,
            time: body.time,
            numberOfQuestions: body.numberOfQuestions,
            attempts: 0
        });

        return NextResponse.json({ success: true, resultId: result.insertedId }, { headers: headers });

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

