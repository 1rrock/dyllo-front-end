import { MessageBubble } from "@/shared/components/chat/MessageBubble";
import { DateDivider } from "@/shared/components/chat/DateDivider";
import { useEffect, useRef } from "react";

export interface Message {
    id: string;
    type: "sent" | "received";
    message: string;
    time: string;
    avatar?: string;
    userName?: string;
}

interface MessageListProps {
    messages: Message[];
    showDateDivider?: boolean;
    dateText?: string;
}

export function MessageList({
    messages,
    showDateDivider = true,
    dateText = "오늘",
}: MessageListProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 새 메시지가 추가될 때마다 스크롤을 최하단으로
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto py-4 md:py-6 px-4 md:px-7 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-indigo-200 [&::-webkit-scrollbar-thumb]:rounded">
            {showDateDivider && <DateDivider date={dateText} />}

            <div className="space-y-4">
                {messages.map((msg) => (
                    <MessageBubble
                        key={msg.id}
                        type={msg.type}
                        message={msg.message}
                        time={msg.time}
                        avatar={msg.avatar}
                        userName={msg.userName}
                    />
                ))}
                {/* 스크롤 타겟 */}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}
