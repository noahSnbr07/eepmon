'use client';

import { Moon } from "lucide-react";
import { ToastContainer } from "react-toastify";

interface _props {
    children: React.ReactNode;
}

//only use in root layout to enable notifications via package
export default function NotificationRootWrapper({ children }: _props) {
    return (
        <>
            <ToastContainer
                style={{ backgroundColor: "hsl(230, 19%, 15%)" }}
                icon={<Moon />}
                position="top-center"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"
            />
            {children}
        </>
    );
}