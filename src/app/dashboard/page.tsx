'use server';

import database from "@/config/database";
import Wrapper from "../../utils/components/wrapper";
import CardWrapper from "./components/card-wrapper";
import MonitorLink from "./components/monitor-link";
import getAuth from "@/functions/get-auth";
import Recent from "./components/recent";
import Statistics from "./components/statistics";
import MonitorCommands from "./components/monitor-commands";
import Chart from "./components/chart";
import MinifiedLog from "@/interfaces/minified-log";

export default async function page() {

    const auth = await getAuth();

    const profile = await database.profile.findUnique({ where: { id: auth?.profileId } });
    if (!profile) return <></>;

    const data = await database.user.findUnique({
        where: { id: auth?.id },
        include: {
            logs: {
                orderBy: {
                    created: "desc"
                }, take: profile.logsLimit
            }, monitor: true
        },
        omit: { hash: true }
    });
    if (!data) return <></>;

    return (
        <Wrapper>
            <div className="flex flex-col gap-4 p-4 size-full">
                <CardWrapper
                    name="Monitor">
                    <MonitorLink running={data.monitor.running} />
                    <MonitorCommands running={data.monitor.running} />
                </CardWrapper>
                <CardWrapper
                    name="Duration Chart">
                    <Chart logs={data.logs as MinifiedLog[]} />
                </CardWrapper>
                <CardWrapper
                    name="Recent Logs">
                    <Recent logs={data?.logs} />
                </CardWrapper>
                <CardWrapper
                    name="Calculated Statistics">
                    <Statistics logs={data.logs} />
                </CardWrapper>
            </div>
        </Wrapper>
    );
}