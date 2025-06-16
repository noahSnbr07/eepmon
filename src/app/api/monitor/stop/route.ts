import database from '@/config/database';
import getAuth from '@/functions/get-auth';
import APIResponse from '@/interfaces/api-response';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { differenceInSeconds } from "date-fns";
export async function POST(): Promise<NextResponse<APIResponse>> {

    //check authentication
    const auth = await getAuth();
    if (!auth) return NextResponse.json({
        data: null,
        message: "Error during auth process",
        status: 403,
        success: false
    });

    try {

        //retrieve target monitor column
        const target = await database.monitor.findUnique({ where: { id: auth.monitorId } });
        if (!target) return NextResponse.json({
            data: null,
            message: "Monitor not found",
            status: 404,
            success: false
        });

        //check weather it's running
        if (!target.running) return NextResponse.json({
            data: null,
            message: "Monitor not running",
            status: 500,
            success: false
        });

        //calculate duration
        const duration = differenceInSeconds(new Date(), target.started);
        const start = target.started;
        const stop = target.stopped;

        //update state
        await database.monitor.update({
            where: { id: auth.monitorId },
            data: { stopped: new Date(), running: false }
        });

        //catch invalid duration
        const invalidDuration = duration <= 0;
        if (invalidDuration) return NextResponse.json({
            data: null,
            message: "Delay not exceeded. Monitor stopped",
            status: 400,
            success: false
        });

        //create new log
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

        //catch errors
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