"use server";

import Auth from "@/interfaces/auth";
import { cookies } from "next/headers";
import { decode } from "jsonwebtoken";

export default async function getAuth(): Promise<Auth | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("eepmon-token");
    if (!token) return null;

    const decoded = decode(token!.value);
    if (!decoded) return null;

    return {
        authenticated: false,
        ...(typeof decoded === "object" && decoded !== null ? decoded : {})
    } as Auth
}