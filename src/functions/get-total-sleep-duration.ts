import { Log } from "@prisma/client";
import getFormattedDuration from "./get-formatted-duration";

interface _props {
    logs: Log[];
}

export default function getTotalSleepDuration({ logs }: _props): string {

    const total = logs.reduce((accumulator, current) => current.duration + accumulator, 0);
    const formatted = getFormattedDuration({ duration: total });
    return formatted;

}