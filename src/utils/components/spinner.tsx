'use client';

import { ClipLoader } from "react-spinners";

//globally usable to indicate pending state
export default function Spinner() {
    return (
        <ClipLoader size={16} color="white" />
    );
}