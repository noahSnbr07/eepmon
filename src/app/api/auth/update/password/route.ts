import database from '@/config/database';
import getAuth from '@/functions/get-auth';
import APIResponse from '@/interfaces/api-response';
import { hash } from 'bcrypt';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(_request: NextRequest): Promise<NextResponse<APIResponse>> {

    //retrieve fields
    const formData = await _request.formData();
    const newPassword = formData.get("password") as string;

    //verify auth
    const auth = await getAuth();
    if (!auth) return NextResponse.json({
        data: null,
        message: "Auth failed",
        status: 403,
        success: false
    });

    //validate fields
    const validPassword: boolean = newPassword !== null && newPassword.length >= 4;
    if (!validPassword) return NextResponse.json({
        data: null,
        message: "Invalid form fields",
        status: 400,
        success: false
    });

    try {

        //retrieve target user
        const target = await database.user.findUnique({ where: { id: auth.id } });
        if (!target) return NextResponse.json({
            data: null,
            message: "User not found",
            status: 404,
            success: false
        });

        //create new hash
        const newHash = await hash(newPassword, 4);

        //update user.hash
        await database.user.update({
            where: { id: auth.id },
            data: { hash: newHash },
        });

        //return success
        return NextResponse.json({
            data: null,
            message: "Hash updated successfully",
            status: 200,
            success: true
        })

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