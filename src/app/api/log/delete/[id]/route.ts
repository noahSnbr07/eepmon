import database from '@/config/database';
import getAuth from '@/functions/get-auth';
import APIResponse from '@/interfaces/api-response';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(_request: NextRequest, context: { params: Promise<{ id: string }> }): Promise<NextResponse<APIResponse>> {
    const params = await context.params;

    const uuid = params.id;
    console.log(_request.method);

    const auth = await getAuth();
    if (!auth) {
        return NextResponse.json({
            data: null,
            message: "Auth failed",
            status: 403,
            success: false
        });
    }

    if (!uuid || uuid.length < 1) {
        return NextResponse.json({
            data: null,
            message: "Id malformed",
            status: 400,
            success: false
        });
    }

    try {
        const target = await database.log.findUnique({ where: { id: uuid } });
        if (!target) {
            return NextResponse.json({
                data: null,
                message: "Target log not found",
                status: 404,
                success: false
            });
        }

        await database.log.delete({ where: { id: uuid } });
        return NextResponse.json({
            data: null,
            message: "Log deleted successfully",
            status: 200,
            success: true
        });

    } catch (error) {
        return NextResponse.json({
            data: null,
            message: "Uncaught error",
            status: 500,
            success: false,
            error: error instanceof Error ? error : "Uncaught error",
        });
    }
}