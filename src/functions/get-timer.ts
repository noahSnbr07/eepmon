import { intervalToDuration } from "date-fns";

export default function getTimer(totalSeconds: number): string {
    const startDate = new Date(0);
    const endDate = new Date(totalSeconds * 1000);
    const { hours = 0, minutes = 0, seconds = 0 } = intervalToDuration({ start: startDate, end: endDate });
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};