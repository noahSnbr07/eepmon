'use client';

import { differenceInSeconds } from "date-fns";
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
            const difference = differenceInSeconds(new Date(), started);
            setDuration(difference);
        }, 1000);

        return () => clearInterval(updateInterval);
    }, [running, started]);

    if (!running) return <b className="text-lg opacity-50"> 00:00 </b>

    const hours = Math.floor(duration / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((duration % 3600) / 60).toString().padStart(2, '0');
    const seconds = Math.floor(duration % 60).toString().padStart(2, '0');
    const time = `${hours}:${minutes}:${seconds}`;

    return (
        <b className="text-lg opacity-50"> {time} </b>
    );
}