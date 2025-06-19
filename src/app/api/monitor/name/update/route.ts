import database from '@/config/database';
import getAuth from '@/functions/get-auth';
import APIResponse from '@/interfaces/api-response';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(_request: NextRequest): Promise<NextResponse<APIResponse>> {

    //retrieve body
    const formData = await _request.formData();

    //verify auth
    const auth = await getAuth();
    if (!auth) return NextResponse.json({
        data: null,
        message: "Auth failed",
        status: 403,
        success: false
    });

    //verify fields
    const newName = formData.get("name") as string;
    const validName = newName !== null && newName.length >= 4;

    if (!validName) return NextResponse.json({
        data: null,
        message: "Invalid form fields",
        status: 400,
        success: false
    });

    try {

        //check wether target exists
        const target = await database.monitor.findMany({ where: { id: auth.monitorId } });
        if (!target) return NextResponse.json({
            data: null,
            message: "Monitor not found",
            status: 404,
            success: false
        });

        //update target
        await database.monitor.update({ where: { id: auth.monitorId }, data: { name: newName } });
        return NextResponse.json({
            data: null,
            message: "Monitor name updated successfully",
            status: 200,
            success: true,
        });
    } catch (error) {

        //catch error
        return NextResponse.json({
            data: null,
            message: "Uncaught error",
            status: 500,
            success: false,
            error: error instanceof Error ? error : "Uncaught message",
        });
    }

}