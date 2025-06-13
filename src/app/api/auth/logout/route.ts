import APIResponse from '@/interfaces/api-response';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(): Promise<NextResponse<APIResponse>> {

    const cookieStore = await cookies();

    try {
        cookieStore.delete("eepmon-token");
        return NextResponse.json({
            data: null,
            message: "Logged out",
            status: 200,
            success: true,

        });
    } catch (error) {

        return NextResponse.json({
            data: null,
            error: error instanceof Error ? error : "Uncaught error",
            message: "Uncaught error",
            status: 500,
            success: false
        });
    }

}