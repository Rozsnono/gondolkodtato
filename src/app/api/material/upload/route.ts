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

export async function POST(req: Request) {
    const origin = req.headers.get('origin') || '*';
    const headers = {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    try {
        const playerId = new URL(req.url).searchParams.get('playerId') || '';

        const formData = await req.formData();
        const file = formData.get('file')! as any;

        const title = formData.get('title')?.toString() || '';
        const category = formData.get('category')?.toString() || '';
        const link = formData.get('link')?.toString() || '';

        let result;

        const client = await clientPromise;
        const db = client.db('gondolkodtato');

        if (!file) {

            result = await db.collection('materials').insertOne({
                _id: new mongoose.Types.ObjectId(),
                createdBy: playerId,
                createdAt: new Date(),
                title,
                category,
                downloads: 0,
                fileInfo: {
                    fileRoute: link,
                    size: 0,
                    type: 'URL',
                },
            });
        } else {
            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = file.name.replaceAll(" ", "_");

            await writeFile(
                path.join(process.cwd(), "public/assets/materials/" + filename),
                buffer
            );

            result = await db.collection('materials').insertOne({
                _id: new mongoose.Types.ObjectId(),
                createdBy: playerId,
                createdAt: new Date(),
                title,
                category,
                downloads: 0,
                fileInfo: {
                    fileRoute: "/assets/materials/" + filename,
                    size: file.size,
                    type: (file.type.split('/')[1] == 'vnd.openxmlformats-officedocument.wordprocessingml.document' ? 'docx' : file.type.split('/')[1]),
                },
            });
        }




        return NextResponse.json({ success: true, resultId: result.insertedId }, { headers });
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
