"use server";

import getAuth from "@/functions/get-auth";
import Card from "./components/card";
import { redirect } from "next/navigation";

export default async function page() {

    const auth = await getAuth();
    if (auth) redirect("/dashboard");

    return (
        <div className="size-full flex flex-col justify-center items-center">
            <Card />
        </div>
    );
}