"use client";

import {useState, useEffect} from "react";
import {useRouter, useParams} from "next/navigation";
import {Sidebar} from "@/domain/chat/components/Sidebar";
import {ChatHeader} from "@/domain/chat/components/ChatHeader";
import {MessageList, Message} from "@/domain/chat/components/MessageList";
import {ChatInput} from "@/domain/chat/components/ChatInput";
import {
    channels,
    getChannelById,
    getMessagesByChannelId,
} from "@/shared/data/dummyData";
import { useUiStore } from "@/shared/store/uiStore";

export default function ChatPage() {
    const router = useRouter();
    const params = useParams();
    const channelId = params.id as string;

    const { isSidebarOpen, setIsSidebarOpen } = useUiStore();
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentChannel, setCurrentChannel] = useState(getChannelById(channelId));

    useEffect(() => {
        // 채널 정보 업데이트
        const channel = getChannelById(channelId);
        if (!channel) {
            router.push("/");
            return;
        }
        setCurrentChannel(channel);

        // 메시지 로드
        setMessages(getMessagesByChannelId(channelId));
    }, [channelId, router]);

    const handleSendMessage = (message: string) => {
        // 새 메시지 추가 (더미)
        const newMessage: Message = {
            id: String(messages.length + 1),
            type: "sent",
            message,
            time: new Date().toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };
        setMessages([...messages, newMessage]);
    };

    if (!currentChannel) {
        return null;
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar
                userName="내 이름"
                userStatus="🟢 온라인"
                channels={channels}
                activeChannelId={channelId}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* 메인 채팅 영역 */}
            <div className="flex-1 flex flex-col bg-[#faf9fc] min-w-0">
                <ChatHeader
                    channelName={currentChannel.name}
                    channelAvatar={currentChannel.avatar}
                    onlineCount={5}
                    onCall={() => console.log("Call")}
                    onVideo={() => console.log("Video")}
                    onMembers={() => console.log("Members")}
                    onMore={() => console.log("More")}
                    onMenuClick={() => setIsSidebarOpen(true)}
                />

                <MessageList messages={messages}/>

                <ChatInput
                    onSend={handleSendMessage}
                    onAttach={() => console.log("Attach")}
                    onEmoji={() => console.log("Emoji")}
                />
            </div>
        </div>
    );
}
