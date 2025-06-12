import database from '@/config/database';
import APIResponse from '@/interfaces/api-response';
import { NextResponse, NextRequest } from 'next/server';
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { cookies } from 'next/headers';

export async function POST(_request: NextRequest): Promise<NextResponse<APIResponse>> {

    //retrieve fields
    const formData = await _request.formData();
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;

    //variables to handle JWTs
    const secret = process.env.JWT_SECRET as string;
    const cookieStore = await cookies();

    const validName: boolean = name !== null && name.length >= 4;
    const validPassword: boolean = password !== null && password.length >= 4;

    if (!validName || !validPassword) return NextResponse.json({
        success: false,
        data: null,
        message: "Invalid form fields",
        status: 400,
    });

    try {
        const target = await database.user.findUnique({ where: { name } });

        if (!target) return NextResponse.json({
            success: false,
            data: null,
            message: "User not found",
            status: 404,
        });

        const { hash, ...userSafe } = target;

        const match: boolean = await compare(password, hash);
        if (!match) return NextResponse.json({
            success: false,
            data: null,
            message: "Login failed",
            status: 403,
        });

        const token = sign(
            userSafe,
            secret,
            {
                algorithm: "HS256",
                expiresIn: "24h",
                issuer: "Eepmon",
            }
        );

        cookieStore.set({
            name: "eepmon-token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60,
            priority: "high",
            sameSite: "lax",
        });

        return NextResponse.json({
            success: true,
            data: null,
            message: "Login succeeded",
            status: 200,
        });


    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            data: null,
            message: "Uncaught Error",
            status: 500,
            error: error instanceof Error ? error : "Uncaught error",
        });
    }
}