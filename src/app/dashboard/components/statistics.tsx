'use server';

import getAverageDuration from "@/functions/get-average-duration";
import getFormattedDuration from "@/functions/get-formatted-duration";
import { Log } from "@prisma/client";

interface _props {
    logs: Log[];
}

export default async function Statistics({ logs }: _props) {

    const average = await getAverageDuration({ logs });
    const averageFormatted = await getFormattedDuration({ duration: average });

    return (
        <div className="flex flex-col">
            <span className="flex gap-2">
                <b> Average: {averageFormatted}</b>
            </span>
        </div>
    );
}