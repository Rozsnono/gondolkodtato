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

    try {
        const client = await clientPromise
        const db = client.db('gondolkodtato')
        const playerId = new URL(req.url).searchParams.get('playerId') || '';

        const result = await db.collection('materials').find(
            { createdBy: playerId }
        ).toArray();

        if (!result || result.length === 0) {
            return NextResponse.json({ success: false, message: 'Material not found or not authorized' }, { status: 404, headers: headers });
        }

        return NextResponse.json({ success: true, materials: result }, { headers: headers });

    } catch (error) {
        console.error('Hiba a GET során:', error);
        return NextResponse.json({ error: 'Szerverhiba' }, { status: 500, headers: headers });
    }
}

export async function PUT(req: Request) {
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
        const materialId = new URL(req.url).searchParams.get('materialId') || '';

        const body = await req.json();

        const result = await db.collection('materials').updateOne(
            { _id: new mongoose.Types.ObjectId(materialId), createdBy: playerId },
            { $set: { ...body, updatedAt: new Date() } }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ success: false, message: 'Material not found or not authorized' }, { status: 404, headers: headers });
        }

        return NextResponse.json({ success: true }, { headers: headers });

    } catch (error) {
        console.error('Hiba a PUT során:', error);
        return NextResponse.json({ error: 'Szerverhiba' }, { status: 500, headers: headers });
    }
}

export async function DELETE(req: Request) {
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
        const materialId = new URL(req.url).searchParams.get('materialId') || '';

        const result = await db.collection('materials').deleteOne(
            { _id: new mongoose.Types.ObjectId(materialId), createdBy: playerId }
        );

        if (result.deletedCount === 0) {
            return NextResponse.json({ success: false, message: 'Material not found or not authorized' }, { status: 404, headers: headers });
        }

        return NextResponse.json({ success: true }, { headers: headers });

    } catch (error) {
        console.error('Hiba a DELETE során:', error);
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