// app/api/users/route.ts
import clientPromise from '../../../lib/mongodb';
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
    const category = new URL(req.url).searchParams.get('category') || '';
    const limit = parseInt(new URL(req.url).searchParams.get('limit') || '18', 18);

    const query = category ? { category: category } : {};

    const quizzes = await db.collection('quizzes').find(query, { projection: { questions: 0 } }).limit(limit).sort({ createdAt: 1 }).toArray();
    const grouped = await db.collection('quizzes').aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }, { $sort: { count: -1 } }]).toArray();

    return NextResponse.json({ data: quizzes, categories: grouped }, { headers });
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
