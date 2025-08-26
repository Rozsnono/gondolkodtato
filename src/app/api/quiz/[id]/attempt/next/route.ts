// app/api/users/route.ts
import clientPromise from '../../../../../../lib/mongodb';
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
        const quizId = new URL(req.url).searchParams.get('quizId') || '';
        const attemptId = new URL(req.url).searchParams.get('attemptId') || '';

        const attempt = await db.collection('attempts').findOne({ _id: new mongoose.Types.ObjectId(attemptId)});

        if (!attempt) {
            return NextResponse.json({ error: 'Attempt not found' }, { status: 404, headers: headers });
        }

        const body = await req.json();

        if (!body.answers) {
            return NextResponse.json({ error: 'Answers not provided' }, { status: 400, headers: headers });
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const isCorrect = body.answers.length > 0 ? body.answers.every((answer: any, index: number) => attempt.questions[attempt.current].answers.includes(answer)) : false;

        const answers = [...attempt.answers, { current: attempt.current, answers: body.answers, isCorrect: isCorrect }];

        const result = await db.collection('attempts').updateOne(
            { _id: attempt._id },
            { $set: { answers: answers, current: attempt.current + 1 } }
        );

        if (!result.modifiedCount) {
            return NextResponse.json({ error: 'Failed to update attempt' }, { status: 500, headers: headers });
        }

        return NextResponse.json({ success: true }, { headers: headers });

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

