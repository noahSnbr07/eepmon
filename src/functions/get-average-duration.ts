'use server';

import { Log } from "@prisma/client";

interface _props {
    logs: Log[];
}

export default async function getAverageDuration({ logs }: _props): Promise<number> {

    const total = logs.reduce((accumulator, currentValue) => accumulator + currentValue.duration, 0);

    return total / logs.length;

}