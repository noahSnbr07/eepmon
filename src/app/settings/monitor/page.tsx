'use server';

import database from "@/config/database";
import getAuth from "@/functions/get-auth";
import { redirect } from "next/navigation";
import ResetButton from "./components/reset-button";

export default async function page() {

    const auth = await getAuth();
    if (!auth) redirect("/");

    const monitor = await database.monitor.findUnique({ where: { id: auth.monitorId } });
    if (!monitor) redirect("/");

    return (
        <div className="size-full flex flex-col gap-4 p-4">
            <ResetButton />
        </div>
    );
}