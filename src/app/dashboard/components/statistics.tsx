'use server';

import getAverageDuration from "@/functions/get-average-duration";
import getFormattedDuration from "@/functions/get-formatted-duration";
import getTotalSleepDuration from "@/functions/get-total-sleep-duration";
import { Log } from "@prisma/client";

interface _props {
    logs: Log[];
}

export default async function Statistics({ logs }: _props) {
    const average = getAverageDuration({ logs });
    const averageFormatted = getFormattedDuration({ duration: average });

    //calculate values from logs
    const sorted = logs.sort((log1, log2) => log1.duration - log2.duration);
    const shortest = sorted[0];
    const longest = sorted[sorted.length - 1];
    const total = getTotalSleepDuration({ logs });

    return (
        <div className="rounded-lg border-stack border-2">
            <table className="size-full rounded-lg">
                <thead className="text-left">
                    <tr className="bg-stack">
                        <th className="px-4 py-2">Metric</th>
                        <th className="px-4 py-2">Value</th>
                    </tr>
                </thead>
                <tbody className="divide-stack divide-dashed divide-y-2">
                    <tr>
                        <td className="px-4 py-2">Average</td>
                        <td className="px-4 py-2">{averageFormatted}</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2">Shortest</td>
                        <td className="px-4 py-2">{getFormattedDuration(shortest || 0)}</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2">Longest</td>
                        <td className="px-4 py-2">{getFormattedDuration(longest || 0)}</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2">Total Logs</td>
                        <td className="px-4 py-2">{logs.length}</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2">Total Duration</td>
                        <td className="px-4 py-2">{total}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}