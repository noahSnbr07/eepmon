'use client';
import { Log } from "@prisma/client";
import { motion } from "framer-motion";

interface _props {
    logs: Log[];
}

export default function Recent({ logs }: _props) {

    if (logs.length < 1) return <i className="opacity-50"> no logs yet ... </i>

    return (
        <div className="flex flex-col">
            {logs.slice(0, 5).map((log, _index) =>
                <motion.div
                    initial={{ opacity: .5, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: _index * .1, type: "keyframes" }}
                    key={_index}
                    className="odd:bg-stack flex gap-2 py-2 px-4 justify-between items-center">
                    <b> {log.duration} </b>
                    <i className="text-sm opacity-50">
                        {log.created.toLocaleDateString()}

                    </i>
                </motion.div>
            )}
        </div>
    );
}