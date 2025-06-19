'use server';

import database from "@/config/database";
import getAuth from "@/functions/get-auth";
import MutationButton from "@/utils/components/mutation-button";
import { DatabaseBackup } from "lucide-react";
import { redirect } from "next/navigation";
import NameInput from "./components/name-input";

export default async function page() {

    const auth = await getAuth();
    if (!auth) redirect("/");

    const monitor = await database.monitor.findUnique({ where: { id: auth.monitorId } });
    if (!monitor) redirect("/");

    return (
        <div className="size-full flex flex-col gap-4 p-4">
            <MutationButton
                endpoint="/api/monitor/reset"
                icon={<DatabaseBackup />}
                name="Reset Monitor"
            />
            <NameInput currentName={monitor.name} />
        </div>
    );
}