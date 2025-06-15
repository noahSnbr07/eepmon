'use client';

import MutationButton from "@/utils/components/mutation-button";

interface _props {
    running: boolean;
}

export default function MonitorCommands({ }: _props) {


    return (
        <div className="flex gap-2">

            <MutationButton
                reload
                className="flex-1 bg-stack rounded-md font-bold py-2 px-4 gap-4"
                endpoint="/api/monitor/start"
                name="Start"
            />
            <MutationButton
                reload
                className="flex-1 bg-stack rounded-md font-bold py-2 px-4 gap-4"
                endpoint="/api/monitor/stop"
                name="Stop"
            />
        </div>
    );
}