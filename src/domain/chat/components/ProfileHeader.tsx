import { Avatar } from "@/shared/components/chat/Avatar";

interface ProfileHeaderProps {
    name: string;
    status: string;
    onNewChat?: () => void;
    onLogout?: () => void;
}

export function ProfileHeader({
    name,
    status,
    onNewChat,
    onLogout,
}: ProfileHeaderProps) {
    return (
        <div className="p-6 pb-6 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white">
            <div className="flex items-center gap-3 mb-4">
                <Avatar size="lg" name={name} />
                <div>
                    <h2 className="text-lg font-bold mb-0.5">{name}</h2>
                    <div className="text-[13px] opacity-90">{status}</div>
                </div>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={onNewChat}
                    className="flex-1 py-2 px-2 bg-white/20 border border-white/30 rounded-[10px] text-white text-xs cursor-pointer transition-all hover:bg-white/30"
                >
                    ➕ 새 대화
                </button>
                <button
                    onClick={onLogout}
                    className="flex-1 py-2 px-2 bg-white/20 border border-white/30 rounded-[10px] text-white text-xs cursor-pointer transition-all hover:bg-white/30"
                >
                    🚪 로그아웃
                </button>
            </div>
        </div>
    );
}

