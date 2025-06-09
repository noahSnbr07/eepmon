'use server';

import { cat, mario } from "@/assets/assets";
import database from "@/config/database";
import getAuth from "@/functions/get-auth";
import Image from "next/image";
import Button from "./components/button";
import { redirect } from "next/navigation";
import Status from "./components/status";

export default async function page() {

    const auth = await getAuth();
    const monitor = await database.monitor.findUnique({ where: { id: auth?.monitorId } });
    if (!monitor) redirect("/dashboard");

    return (
        <div className="size-full flex flex-col justify-evenly items-center gap-8">
            <Image
                unoptimized
                src={cat}
                height={128}
                width={128}
                alt="Cat"
                title="Cat" />
            <Status
                running={monitor.running}
                started={monitor.started.toISOString()} />
            <Button running={monitor.running} />
        </div>
    );
}