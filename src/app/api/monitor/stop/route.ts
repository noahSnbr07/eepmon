import database from '@/config/database';
import getAuth from '@/functions/get-auth';
import APIResponse from '@/interfaces/api-response';
import { revalidatePath } from 'next/cache';
import { NextResponse, NextRequest } from 'next/server';
import { differenceInSeconds } from "date-fns";
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

        const duration = differenceInSeconds(new Date(), target.started);
        const start = target.started;
        const stop = target.stopped;

        await database.monitor.update({
            where: { id: auth.monitorId },
            data: { stopped: new Date(), running: false }
        });

        const newLog = await database.log.create({
            data: {
                duration,
                start,
                stop,
                quality: 5,
                userId: auth.id
            },
        })

        return NextResponse.json({
            data: { newLog },
            message: "Monitor stopped",
            status: 200,
            success: true
        });

    } catch (error) {
        console.error(error)
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