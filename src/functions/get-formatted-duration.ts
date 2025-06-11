interface _props {
    duration: number;
}

export default function getFormattedDuration({ duration }: _props): string {

    const hours = Math.floor(duration / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((duration % 3600) / 60).toString().padStart(2, '0');
    const seconds = Math.floor(duration % 60).toString().padStart(2, '0');
    const time = `${hours}:${minutes}:${seconds}`;

    return time;
}