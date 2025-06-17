import database from '@/config/database';
import getAuth from '@/functions/get-auth';
import APIResponse from '@/interfaces/api-response';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(): Promise<NextResponse<APIResponse>> {

    const auth = await getAuth();
    const cookieStore = await cookies();

    if (!auth) return NextResponse.json({
        data: null,
        message: "Auth failed",
        status: 403,
        success: false,
    });

    try {

        const target = await database.user.findUnique({ where: { id: auth.id } });
        if (!target) return NextResponse.json({
            data: null,
            message: "Target not found",
            status: 404,
            success: false,
        });

        //deletes  user, monitor, logs and profile
        await database.log.deleteMany({ where: { userId: auth.id } });
        await database.user.delete({ where: { id: auth.id } });
        await database.monitor.delete({ where: { id: auth.monitorId } });
        await database.profile.delete({ where: { id: auth.profileId } });


        cookieStore.delete("eepmon-token");
        return NextResponse.json({
            data: null,
            message: "Account and related data deleted",
            status: 200,
            success: true,
        });


    } catch (error) {
        console.log(error)
        return NextResponse.json({
            data: null,
            message: "Uncaught Error",
            status: 500,
            success: false,
            error: error instanceof Error ? error : "Uncaught Error"
        });
    }

}