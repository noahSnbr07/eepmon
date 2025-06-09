import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import APIResponse from './interfaces/api-response'

export async function middleware(request: NextRequest) {
    const cookieHeader = request.headers.get('cookie') || '';

    const url = new URL("/api/auth/verify", request.url);
    const response = await fetch(url.toString(), {
        method: "POST",
        headers: {
            cookie: cookieHeader
        }
    });

    const data: APIResponse = await response.json();

    return data.success
        ? NextResponse.next()
        : NextResponse.redirect(new URL("/auth", request.url));
}

export const config = {
    matcher: ['/dashboard'],
}