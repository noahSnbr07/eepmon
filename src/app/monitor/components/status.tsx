'use client';

import { differenceInSeconds } from "date-fns";
import { useEffect, useState } from "react";
import getFormattedDuration from "@/functions/get-formatted-duration";

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

    return (
        <b className="text-lg opacity-50"> {getFormattedDuration({ duration })} </b>
    );
}