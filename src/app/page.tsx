"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {SsgoiTransition} from "@ssgoi/react";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        // 메인 페이지 접속 시 첫 번째 채널로 리다이렉트
        router.push("/chat/1");
    }, [router]);

    return (
        <SsgoiTransition id="/">
            <div className="flex h-screen items-center justify-center bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#4a5568]">
                <div className="text-white text-xl">채팅방으로 이동중...</div>
            </div>
        </SsgoiTransition>
    );
}
