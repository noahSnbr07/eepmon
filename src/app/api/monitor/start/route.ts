import database from '@/config/database';
import getAuth from '@/functions/get-auth';
import APIResponse from '@/interfaces/api-response';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { addMinutes } from "date-fns";

export async function POST(): Promise<NextResponse<APIResponse>> {

    //check authentication
    const auth = await getAuth();
    if (!auth) return NextResponse.json({
        data: null,
        message: "Error during auth process",
        status: 403,
        success: false
    });

    //retrieve target profile
    const profile = await database.profile.findUnique({ where: { id: auth.profileId }, select: { delay: true } });
    if (!profile) return NextResponse.json({
        data: null,
        message: "Profile not found",
        status: 404,
        success: false
    });

    try {

        //retrieve target monitor to start
        const target = await database.monitor.findUnique({ where: { id: auth.monitorId } });
        if (!target) return NextResponse.json({
            data: null,
            message: "Monitor not found",
            status: 404,
            success: false
        });

        if (target.id !== auth.monitorId) return NextResponse.json({
            data: null,
            message: "Ownership failed",
            status: 403,
            success: false
        });

        //estimate future start time with delay
        const startTime: Date = addMinutes(new Date(), profile.delay * 60);

        //stop monitor
        await database.monitor.update({
            where: { id: auth.monitorId },
            data: { started: startTime, running: true }
        });

        return NextResponse.json({
            data: null,
            message: "Monitor started",
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