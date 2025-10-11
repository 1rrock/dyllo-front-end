import { Avatar } from "./Avatar";
import { cn } from "@/shared/lib/utils";

interface MessageBubbleProps {
    type: "sent" | "received";
    message: string;
    time: string;
    avatar?: string;
    userName?: string;
}

export function MessageBubble({
    type,
    message,
    time,
    avatar,
    userName,
}: MessageBubbleProps) {
    if (type === "sent") {
        return (
            <div className="flex flex-col items-end mb-4">
                <div className="max-w-[85%] sm:max-w-[60%] py-3.5 px-4 rounded-[20px] rounded-br-md bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white shadow-[0_4px_16px_rgba(102,126,234,0.3)] animate-popIn">
                    <div className="text-[15px] leading-[1.5] mb-1 break-words">{message}</div>
                    <div className="text-[11px] opacity-70 text-right">{time}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex gap-2 md:gap-3 mb-4">
            {avatar && <Avatar size="sm" name={userName || avatar} emoji={avatar} />}
            <div className="max-w-[85%] sm:max-w-[60%] py-3.5 px-4 rounded-[20px] rounded-bl-md bg-white text-gray-800 shadow-[0_2px_12px_rgba(0,0,0,0.08)] animate-popIn">
                <div className="text-[15px] leading-[1.5] mb-1 break-words">{message}</div>
                <div className="text-[11px] opacity-70">{time}</div>
            </div>
        </div>
    );
}
