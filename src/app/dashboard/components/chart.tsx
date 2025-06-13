'use client';

import MinifiedLog from "@/interfaces/minified-log";
import { BarChart, Bar, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface _props {
    logs: MinifiedLog[];
}

export default function Chart({ logs }: _props) {

    const chartData = logs.map(log => ({
        ...log,
        created: new Date(log.created).toLocaleTimeString(),
    })).reverse()

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
                <XAxis dataKey="duration" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="duration" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}   