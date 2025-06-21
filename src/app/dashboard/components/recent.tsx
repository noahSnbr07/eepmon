import getFormattedDuration from "@/functions/get-formatted-duration";
import MutationButton from "@/utils/components/mutation-button";
import { Log } from "@prisma/client";
import { Trash } from "lucide-react";

interface _props {
    logs: Log[];
}

export default async function Recent({ logs }: _props) {

    if (logs.length < 1) return <i className="opacity-50"> no logs yet ... </i>

    return (
        <div className="flex flex-col">
            {logs.slice(0, 5).map((log, _index) => {
            const safeDuration = Number(log.duration) || 0;
            const tempCreatedDate = new Date(log.created);
            const finalCreatedDate = isNaN(tempCreatedDate.getTime()) ? new Date() : tempCreatedDate;
                <div
                    key={_index}
                    className="odd:bg-stack first:rounded-t-lg last:rounded-b-lg flex gap-2 py-2 px-4 justify-between items-center">
                    <b> {getFormattedDuration({ duration: safeDuartion || 0 })} </b>
                    <i className="text-sm opacity-50">
                        {finalCreatedDate}
                    </i>
                    <MutationButton
                        endpoint={`/api/log/delete/${log.id}`}
                        name=""
                        className="p-1 bg-stack rounded-sm"
                        icon={<Trash opacity={.5} />}
                        reload
                    />
                </div>
            )}
        </div>
    );
}
