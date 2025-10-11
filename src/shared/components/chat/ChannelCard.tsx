import { Avatar } from "./Avatar";
import { Badge } from "./Badge";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";

interface ChannelCardProps {
    avatar: string;
    name: string;
    preview?: string;
    badge?: number;
    isActive?: boolean;
    onClick?: () => void;
    href?: string;
}

export function ChannelCard({
    avatar,
    name,
    preview,
    badge = 0,
    isActive = false,
    onClick,
    href,
}: ChannelCardProps) {
    const content = (
        <>
            <Avatar size="md" name={avatar} emoji={avatar} />
            <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-800 text-[15px] mb-0.5">{name}</div>
                {preview && (
                    <div className="text-[13px] text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis">
                        {preview}
                    </div>
                )}
            </div>
            {badge > 0 && <Badge count={badge} />}
        </>
    );

    const className = cn(
        "flex items-center gap-3 p-3 rounded-[14px] cursor-pointer mb-2 transition-all",
        isActive
            ? "bg-gradient-to-br from-indigo-200 to-purple-200 shadow-[0_4px_12px_rgba(102,126,234,0.2)]"
            : "bg-white hover:bg-purple-50 hover:translate-x-1"
    );

    if (href) {
        return (
            <Link href={href} className={className} onClick={onClick}>
                {content}
            </Link>
        );
    }

    return (
        <div className={className} onClick={onClick}>
            {content}
        </div>
    );
}
