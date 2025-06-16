import database from '@/config/database';
import getAuth from '@/functions/get-auth';
import APIResponse from '@/interfaces/api-response';
import { NextResponse } from 'next/server';

export async function POST(): Promise<NextResponse<APIResponse>> {

    //retrieve authentication
    const auth = await getAuth();
    if (!auth) return NextResponse.json({
        data: null,
        message: "Auth failed",
        status: 403,
        success: false,
    });

    try {

        //retrieve target monitor
        const monitor = await database.monitor.findUnique({ where: { id: auth.monitorId } });
        if (!monitor) return NextResponse.json({
            data: null,
            message: "Monitor not found",
            status: 404,
            success: false,
        });

        //reset values and running state
        await database.monitor.update({
            where: { id: auth.monitorId },
            data: {
                running: false,
                started: new Date(),
                stopped: new Date(),
                name: "My Monitor",
            }
        });

        return NextResponse.json({
            data: null,
            message: "Monitor reset",
            status: 200,
            success: true,
        });

    } catch (error) {

        //catch errors
        return NextResponse.json({
            data: null,
            message: "Uncaught error",
            status: 403,
            success: false,
            error: error instanceof Error ? error : "Uncaught error",
        });
    }
}