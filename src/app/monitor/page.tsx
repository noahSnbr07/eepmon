'use server';

import { mario } from "@/assets/assets";
import database from "@/config/database";
import getAuth from "@/functions/get-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import Status from "./components/status";
import MutationButton from "@/utils/components/mutation-button";

export default async function page() {

    const auth = await getAuth();
    const monitor = await database.monitor.findUnique({ where: { id: auth?.monitorId } });
    const profile = await database.profile.findUnique({ where: { id: auth?.profileId } });
    if (!profile) redirect("/");
    if (!monitor) redirect("/");

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
            <MutationButton
                reload
                className="p-4 w-xs text-center bg-stack rounded-full"
                name={monitor.running ? "Stop" : "Start"}
                endpoint={`/api/monitor/${monitor.running ? "stop" : "start"}`}
            />
        </div>
    );
}