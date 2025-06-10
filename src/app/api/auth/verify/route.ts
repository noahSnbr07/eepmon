import getAuth from '@/functions/get-auth';
import APIResponse from '@/interfaces/api-response';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse<APIResponse>> {
    const auth = await getAuth();

    return NextResponse.json({
        data: null,
        success: auth !== null,
        status: auth ? 200 : 403,
        message: "",
    })
}