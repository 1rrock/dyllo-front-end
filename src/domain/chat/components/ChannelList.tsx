import { ChannelCard } from "@/shared/components/chat/ChannelCard";
import { SectionTitle } from "@/shared/components/chat/SectionTitle";
import {useUiStore} from "@/shared/store/uiStore";

export interface Channel {
    id: string;
    avatar: string;
    name: string;
    preview?: string;
    badge?: number;
}

interface ChannelListProps {
    channels: Channel[];
    directMessages: Channel[];
    activeChannelId?: string;
}

export function ChannelList({
    channels,
    directMessages,
    activeChannelId,
}: ChannelListProps) {
    const { setIsSidebarOpen } = useUiStore();

    return (
        <div className="flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-indigo-200 [&::-webkit-scrollbar-thumb]:rounded">
            <div className="mb-6">
                <SectionTitle title="큰 뎁스 채널" />
                {channels.map((channel) => (
                    <ChannelCard
                        key={channel.id}
                        avatar={channel.avatar}
                        name={channel.name}
                        preview={channel.preview}
                        badge={channel.badge}
                        isActive={channel.id === activeChannelId}
                        href={`/chat/${channel.id}`}
                        onClick={() => setIsSidebarOpen(false)}
                    />
                ))}
            </div>

            <div className="mb-6">
                <SectionTitle title="다이렉트 메시지" />
                {directMessages.map((dm) => (
                    <ChannelCard
                        key={dm.id}
                        avatar={dm.avatar}
                        name={dm.name}
                        preview={dm.preview}
                        badge={dm.badge}
                        isActive={dm.id === activeChannelId}
                        href={`/chat/${dm.id}`}
                        onClick={() => onChannelClick?.(dm.id)}
                    />
                ))}
            </div>
        </div>
    );
}
