import database from '@/config/database';
import getAuth from '@/functions/get-auth';
import APIResponse from '@/interfaces/api-response';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(_request: NextRequest): Promise<NextResponse<APIResponse>> {

    //retrieve form data
    const formData = await _request.formData();
    const min = Number(formData.get("min"));
    const preferred = Number(formData.get("preferred"));
    const max = Number(formData.get("max"));
    const delay = Number(formData.get("delay"));
    const logsLimit = Number(formData.get("cap"));

    //set conditions
    const validMin = min >= 4 && min <= 8 && min < preferred;
    const validPreferred = preferred > min && preferred < max;
    const validMax = max >= 4 && max > min && max > preferred;
    const validDelay = delay >= 0 && delay <= 1;
    const validLogCap = logsLimit >= 0 && logsLimit <= 31;

    //evaluate previous conditions
    if (!validMin || !validPreferred || !validMax || !validDelay || !validLogCap) return NextResponse.json({
        data: { validMin, validPreferred, validMax, validDelay, validLogCap },
        message: "Invalid form fields",
        status: 400,
        success: false,
    })

    //authenticate request
    const auth = await getAuth();
    if (!auth) return NextResponse.json({
        data: null,
        message: "Auth failed",
        status: 403,
        success: false,
    })

    try {

        //retrieve target profile to update
        const target = await database.profile.findUnique({ where: { id: auth.profileId } });
        if (!target) return NextResponse.json({
            data: null,
            message: "Profile not found",
            status: 404,
            success: false,
        });

        //check ownership
        if (target.id !== auth.profileId) return NextResponse.json({
            data: null,
            message: "Ownership failure",
            status: 403,
            success: false,
        });

        //update preferences
        await database.profile.update({
            where: { id: auth.profileId },
            data: { min, preferred, max, delay, logsLimit },
        });

        //return success
        return NextResponse.json({
            data: null,
            message: "Profile updated successfully",
            status: 200,
            success: true,
        })

        //catch errors
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