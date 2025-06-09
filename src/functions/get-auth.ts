"use server";

import Auth from "@/interfaces/auth";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface _props {
    token?: string;
}

// This function returns the decoded data if valid, or null if invalid
export default async function getAuthentication(token?: string): Promise<Auth | null> {

    //retrieve key, token
    const cookieStore = await cookies();
    const localToken = token || cookieStore.get("token")?.value as string;
    const key = process.env.JWT_SECRET as string;

    try {

        //decode token
        const decoded = jwt.verify(localToken, key);
        if (decoded) return decoded as Auth;
    } catch {

        //error
        return null;
    }

    //error
    return null;
}
