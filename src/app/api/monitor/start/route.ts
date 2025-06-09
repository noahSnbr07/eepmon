import database from '@/config/database';
import getAuth from '@/functions/get-auth';
import APIResponse from '@/interfaces/api-response';
import { revalidatePath } from 'next/cache';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(_request: NextRequest): Promise<NextResponse<APIResponse>> {

    const auth = await getAuth();
    if (!auth) return NextResponse.json({
        data: null,
        message: "Error during auth process",
        status: 403,
        success: false
    });

    try {
        const target = await database.monitor.findUnique({ where: { id: auth.monitorId } });
        if (!target) return NextResponse.json({
            data: null,
            message: "Monitor not found",
            status: 404,
            success: false
        });

        await database.monitor.update({
            where: { id: auth.monitorId },
            data: { started: new Date(), running: true }
        });

        return NextResponse.json({
            data: null,
            message: "Monitor started",
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
    } finally {
        revalidatePath("/", "layout");
    }

}