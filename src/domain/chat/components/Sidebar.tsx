import { ProfileHeader } from "./ProfileHeader";
import { ChannelList, Channel } from "./ChannelList";
import { cn } from "@/shared/lib/utils";

interface SidebarProps {
    userName: string;
    userStatus: string;
    channels: Channel[];
    directMessages: Channel[];
    activeChannelId?: string;
    onNewChat?: () => void;
    onLogout?: () => void;
    isOpen?: boolean;
    onClose?: () => void;
}

export function Sidebar({
    userName,
    userStatus,
    channels,
    directMessages,
    activeChannelId,
    onNewChat,
    onLogout,
    isOpen = true,
    onClose,
}: SidebarProps) {
    return (
        <>
            {/* 모바일 오버레이 */}
            {isOpen && onClose && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* 사이드바 */}
            <div
                className={cn(
                    "w-80 bg-white flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.08)]",
                    // 모바일: 절대 위치, 슬라이드 애니메이션
                    "fixed md:relative inset-y-0 left-0 z-50 transition-transform duration-300",
                    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                )}
            >
                <ProfileHeader
                    name={userName}
                    status={userStatus}
                    onNewChat={onNewChat}
                    onLogout={onLogout}
                />
                <ChannelList
                    channels={channels}
                    directMessages={directMessages}
                    activeChannelId={activeChannelId}
                />
            </div>
        </>
    );
}

interface AvatarProps {
    size?: "sm" | "md" | "lg";
    name: string;
    emoji?: string;
    className?: string;
}

const sizeClasses = {
    sm: "w-9 h-9 text-sm",
    md: "w-12 h-12 text-lg",
    lg: "w-14 h-14 text-2xl",
};

export function Avatar({ size = "md", name, emoji, className }: AvatarProps) {
    const displayText = emoji || name.charAt(0);

    return (
        <div
            className={cn(
                "rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-bold shrink-0",
                sizeClasses[size],
                size === "lg" && "bg-white text-[#764ba2] shadow-[0_4px_12px_rgba(0,0,0,0.15)]",
                className
            )}
        >
            {displayText}
        </div>
    );
}
