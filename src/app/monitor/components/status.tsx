'use client';

import getTimer from "@/functions/get-timer";
import { differenceInSeconds } from "date-fns";
import { useEffect, useState } from "react";

interface _props {
    started: string;
    running: boolean;
    delay: number;
}

export default function Status({ started, running, delay }: _props) {
    const [duration, setDuration] = useState<number>(0);

    useEffect(() => {
        if (!running) return;

        const updateInterval = setInterval(() => {
            const difference = differenceInSeconds(new Date(), new Date(started));
            setDuration(difference);
        }, 1000);

        return () => clearInterval(updateInterval);
    }, [running, started]);

    return (
        <b className="opacity-50 flex items-center gap-2 flex-col">
            <b className="text-lg">{running ? getTimer(duration) : '00:00:00'}</b>
            <i className="text-sm"> delay: {delay * 60} Minutes </i>
        </b>
    );
}