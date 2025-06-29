'use server';

import database from "@/config/database";
import Card from "./components/card";
import getAuth from "@/functions/get-auth";
import Auth from "@/interfaces/auth";

export default async function page() {

    const auth = await getAuth() as Auth;

    const data = await database.profile.findUnique({ where: { id: auth.profileId } });

    return (
        <div className="size-full">
            <Card
                defaultLogCap={data?.logsLimit || 0}
                defaultDelay={data?.delay || 0}
                defaultMin={data?.min || 4}
                defaultMax={data?.max || 6}
                defaultPreferred={data?.preferred || 8}
            />
        </div>
    );
}