import getFormattedDuration from "@/functions/get-formatted-duration";
import { Log } from "@prisma/client";

interface _props {
    logs: Log[];
}

export default async function Recent({ logs }: _props) {

    if (logs.length < 1) return <i className="opacity-50"> no logs yet ... </i>

    return (
        <div className="flex flex-col">
            {logs.slice(0, 5).map((log, _index) =>
                <div
                    key={_index}
                    className="odd:bg-stack first:rounded-t-lg last:rounded-b-lg flex gap-2 py-2 px-4 justify-between items-center">
                    <b> {getFormattedDuration({ duration: log.duration })} </b>
                    <i className="text-sm opacity-50">
                        {log.created.toLocaleDateString()}
                    </i>
                </div>
            )}
        </div>
    );
}