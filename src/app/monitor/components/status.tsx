'use client';

import getTimer from "@/functions/get-timer";
import { differenceInSeconds, intervalToDuration } from "date-fns";
import { useEffect, useState } from "react";

interface _props {
    started: string;
    running: boolean;
}

export default function Status({ started, running }: _props) {
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
        <b className="text-lg opacity-50">
            {running ? getTimer(duration) : '00:00:00'}
        </b>
    );
}