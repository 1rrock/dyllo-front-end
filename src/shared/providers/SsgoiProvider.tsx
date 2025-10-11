"use client";

import {Ssgoi, type SsgoiConfig} from "@ssgoi/react";
import {fade, scroll, film, drill} from "@ssgoi/react/view-transitions";

const ssgoiConfig: SsgoiConfig = {
    transitions: [
        {
            from: "/",
            to: "/login",
            transition: fade(),
            symmetric: true
        },
        {
            from: "/login",
            to: "/chat/*",
            transition: fade(),
            symmetric: true
        },
        // Chat to login transition
        {
            from: "/chat/*",
            to: "/login",
            transition: fade(),
            symmetric: true
        },
        // Main to chat transition
        {
            from: "/",
            to: "/chat/*",
            transition: fade(),
            symmetric: true
        },
        // Chat room to chat room transition
        {
            from: "/chat/*",
            to: "/chat/*",
            transition: drill(),
            symmetric: true
        },
    ],
};

export default function SsgoiProvider({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return (
        <Ssgoi config={ssgoiConfig}>
            <div
                style={{position: "relative", minHeight: "100vh", width: "100%"}}
            >
                {children}
            </div>
        </Ssgoi>
    );
}
