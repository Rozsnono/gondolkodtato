import path from "path";
import { writeFile } from "fs/promises";
import clientPromise from '../../../../lib/mongodb';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function GET(req: Request) {
    const origin = req.headers.get('origin') || '*';
    const headers = {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    try {
        const playerId = new URL(req.url).searchParams.get('playerId') || '';
        const id = new URL(req.url).searchParams.get('id') || '';

        const client = await clientPromise;
        const db = client.db('gondolkodtato');

        const material = await db.collection('materials').findOne({ _id: new mongoose.Types.ObjectId(id) });

        if (!material) {
            return NextResponse.json({ success: false, error: 'Anyag nem található' }, { status: 404, headers });
        }

        material.downloads += 1;

        await db.collection('materials').updateOne(
            { _id: material._id },
            { $set: { downloads: material.downloads } }
        );

        return NextResponse.json({ success: true, link: material.fileInfo.fileRoute }, { headers });
    } catch (error) {
        console.error('Hiba a POST során:', error);
        return NextResponse.json({ error: 'Szerverhiba' }, { status: 500, headers });
    }
}

export async function OPTIONS(req: Request) {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': req.headers.get('origin') || '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
