import { Log } from "@prisma/client";

interface _props {
    logs: Log[];
}

export default function getAverageDuration({ logs }: _props): number {

    const total = logs.reduce((accumulator, currentValue) => accumulator + currentValue.duration, 0);

    return total / logs.length;

}