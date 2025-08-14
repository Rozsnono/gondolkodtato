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

    try {

        const client = await clientPromise;
        const db = client.db('gondolkodtato');
        const limit = parseInt(new URL(req.url).searchParams.get('limit') || '18', 18);

        const category = new URL(req.url).searchParams.get('category') || '';

        const query = category ? { category: category } : {};

        const materials = await db.collection('materials').find(query).sort({ 'fileInfo.type': -1 }).limit(limit).toArray();

        const grouped = await db.collection('materials').aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }, { $sort: { count: -1 } }]).toArray();

        if (!materials) {
            return NextResponse.json({ error: 'Nincs elérhető adat' }, { status: 404, headers: headers });
        }

        return NextResponse.json({ success: true, data: materials, categories: grouped }, { headers: headers });

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
