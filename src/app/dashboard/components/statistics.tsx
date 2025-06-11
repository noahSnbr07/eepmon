'use server';

import getAverageDuration from "@/functions/get-average-duration";
import getFormattedDuration from "@/functions/get-formatted-duration";
import { Log } from "@prisma/client";

interface _props {
    logs: Log[];
}

export default async function Statistics({ logs }: _props) {

    const average = getAverageDuration({ logs });
    const averageFormatted = getFormattedDuration({ duration: average });

    const shortest = logs[logs.length - 1];
    const longest = logs[0];

    return (
        <div className="flex flex-col">
            <span className="flex gap-2">
                <b> Average: {averageFormatted} </b>
            </span>
            <span className="flex gap-2">
                <b> Shortest: {getFormattedDuration(shortest)} </b>
            </span>
            <span className="flex gap-2">
                <b> Longest: {getFormattedDuration(longest)} </b>
            </span>
            <span className="flex gap-2">
                <b> Total: {logs.length} logs </b>
            </span>
        </div>
    );
}