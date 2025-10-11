import { Avatar } from "@/shared/components/chat/Avatar";
import { IconButton } from "@/shared/components/chat/IconButton";
import { MobileMenuButton } from "@/shared/components/chat/MobileMenuButton";

interface ChatHeaderProps {
    channelName: string;
    channelAvatar: string;
    onlineCount?: number;
    onCall?: () => void;
    onVideo?: () => void;
    onMembers?: () => void;
    onMore?: () => void;
    onMenuClick?: () => void;
}

export function ChatHeader({
    channelName,
    channelAvatar,
    onlineCount,
    onCall,
    onVideo,
    onMembers,
    onMore,
    onMenuClick,
}: ChatHeaderProps) {
    return (
        <div className="py-5 px-4 md:px-7 bg-white border-b-2 border-[#f0edf7] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
                {/* 모바일 햄버거 메뉴 */}
                {onMenuClick && <MobileMenuButton onClick={onMenuClick} />}

                <Avatar size="md" name={channelName} emoji={channelAvatar} className="shrink-0" />
                <div className="min-w-0">
                    <h3 className="text-base md:text-lg font-bold text-gray-800 mb-0.5 truncate">{channelName}</h3>
                    {onlineCount !== undefined && (
                        <div className="text-[13px] text-green-400 flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            <span className="hidden sm:inline">{onlineCount}명 온라인</span>
                            <span className="sm:hidden">{onlineCount}명</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex gap-1 md:gap-2 shrink-0">
                <IconButton icon="📞" onClick={onCall} className="hidden sm:flex" />
                <IconButton icon="🎥" onClick={onVideo} className="hidden sm:flex" />
                <IconButton icon="👥" onClick={onMembers} />
                <IconButton icon="⋯" onClick={onMore} />
            </div>
        </div>
    );
}
