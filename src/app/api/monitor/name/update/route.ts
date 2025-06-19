import database from '@/config/database';
import getAuth from '@/functions/get-auth';
import APIResponse from '@/interfaces/api-response';
import { hash } from 'bcrypt';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(_request: NextRequest): Promise<NextResponse<APIResponse>> {

    const formData = await _request.formData();

    const auth = await getAuth();
    if (!auth) return NextResponse.json({
        data: null,
        message: "Auth failed",
        status: 403,
        success: false
    });

    const newName = formData.get("name") as string;
    const validName = newName !== null && newName.length >= 4;

    if (!validName) return NextResponse.json({
        data: null,
        message: "Invalid form fields",
        status: 400,
        success: false
    });

    try {

        const target = await database.monitor.findMany({ where: { id: auth.monitorId } });
        if (!target) return NextResponse.json({
            data: null,
            message: "Monitor not found",
            status: 404,
            success: false
        });

        await database.monitor.update({ where: { id: auth.monitorId }, data: { name: newName } });
        return NextResponse.json({
            data: null,
            message: "Monitor name updated successfully",
            status: 200,
            success: true,
        });
    } catch (error) {
        return NextResponse.json({
            data: null,
            message: "Uncaught error",
            status: 500,
            success: false,
            error: error instanceof Error ? error : "Uncaught message",
        });
    }

}