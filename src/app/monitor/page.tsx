'use server';

import { mario } from "@/assets/assets";
import database from "@/config/database";
import getAuth from "@/functions/get-auth";
import Image from "next/image";
import Button from "./components/button";
import { redirect } from "next/navigation";
import Status from "./components/status";

export default async function page() {

    const auth = await getAuth();
    const monitor = await database.monitor.findUnique({ where: { id: auth?.monitorId } });
    const profile = await database.profile.findUnique({ where: { id: auth?.profileId } });
    if (!profile) redirect("/dashboard");
    if (!monitor) redirect("/dashboard");

    return (
        <div className="size-full flex flex-col justify-evenly items-center gap-8">
            <Image
                unoptimized
                src={mario}
                height={128}
                width={128}
                alt="Mario"
                title="Mario" />
            <Status
                delay={profile.delay}
                running={monitor.running}
                started={new Date(monitor.started).toISOString()} />
            <Button running={monitor.running} />
        </div>
    );
}