import { NextResponse, type NextRequest } from 'next/server'
import APIResponse from './interfaces/api-response'

export async function middleware(request: NextRequest) {

    //retrieve JWT
    const cookie = request.headers.get('cookie') || '';

    //fetch verification endpoint
    const url: URL = new URL("/api/auth/verify", request.url);
    const options: RequestInit = { headers: { 'cookie': cookie, } }
    const response = await fetch(url, options);

    //validate response
    const data: APIResponse = await response.json();
    if (data.success) return NextResponse.next();
    else return NextResponse.redirect(new URL("/auth", request.url));
}

export const config = {
    matcher: ['/dashboard', "/settings", "/monitor"],
}