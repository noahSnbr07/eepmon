'use server';

import database from "@/config/database";
import Wrapper from "../utils/components/wrapper";
import CardWrapper from "./components/card-wrapper";
import MonitorLink from "./components/monitor-link";
import getAuth from "@/functions/get-auth";
import Recent from "./components/recent";
import Statistics from "./components/statistics";

export default async function page() {

    const auth = await getAuth();

    const data = await database.user.findUnique({
        where: { id: auth?.id },
        include: { logs: { orderBy: { duration: "desc" } } },
        omit: { hash: true }
    });

    if (!data) return <></>;

    return (
        <Wrapper>
            <div className="flex flex-col gap-4 p-4 size-full">
                <CardWrapper
                    name="Monitor">
                    <MonitorLink running />
                </CardWrapper>
                <CardWrapper
                    name="Recent 5 Logs">
                    <Recent logs={data?.logs} />
                </CardWrapper>
                <CardWrapper
                    name="Statistics">
                    <Statistics logs={data.logs} />
                </CardWrapper>
            </div>
        </Wrapper>
    );
}