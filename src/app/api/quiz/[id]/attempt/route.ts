// app/api/users/route.ts
import clientPromise from '../../../../../lib/mongodb';
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

        const quiz = await db.collection('quizzes').findOne({ _id: new mongoose.Types.ObjectId(quizId) });

        if (!quiz) {
            return NextResponse.json({ error: 'Quiz not found' }, { status: 404, headers: headers });
        }

        const result = await db.collection('attempts').insertOne({
            _id: new mongoose.Types.ObjectId(),
            quizId: quizId,
            questions: quiz.questions.sort(() => Math.random() - 0.5).slice(0, quiz.numberOfQuestions),
            answers: [],
            current: 0,
            startedAt: new Date(),
            quizTitle: quiz.title,
            finishedAt: null,
            attemptedBy: playerId
        })

        await db.collection('quizzes').updateOne({
            _id: new mongoose.Types.ObjectId(quizId)
        }, {
            $inc: { attempts: 1 }
        })

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

