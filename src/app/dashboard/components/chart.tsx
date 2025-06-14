'use client';

import MinifiedLog from "@/interfaces/minified-log";
import { XAxis, YAxis, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";

interface _props {
    logs: MinifiedLog[];
}

export default function Chart({ logs }: _props) {

    const data = logs.map(log => ({
        ...log,
        created: new Date(log.created).toLocaleDateString(),
        quality: log.quality,
    })).reverse();

    return (
        <ResponsiveContainer
            width="100%"
            height={350}>
            <AreaChart
                data={data}>
                <CartesianGrid
                    stroke="#7d7d7d40"
                    strokeDasharray="5 5" />
                <XAxis dataKey="created" />
                <YAxis dataKey="duration" />
                <YAxis dataKey="quality" />
                <Area
                    animationDuration={2500}
                    stroke="#ffffff"
                    fill="#7d7d7d40"
                    type={"monotone"}
                    strokeWidth={2}
                    dataKey="duration" />
            </AreaChart>
        </ResponsiveContainer>
    );
}