import getAuth from '@/functions/get-auth';
import APIResponse from '@/interfaces/api-response';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(_request: NextRequest): Promise<NextResponse<APIResponse>> {

    const cookieStore = await _request.cookies;
    const token = cookieStore.get("eepmon-token")?.value as string;
    const auth = await getAuth(token);

    console.log(`auth: `, auth)

    return NextResponse.json({
        data: { authenticated: auth !== null },
        message: "[empty message]",
        status: 200,
        success: auth !== null,
    });

}