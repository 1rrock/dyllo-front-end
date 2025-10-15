"use client";

import {useState} from "react";
import {useRouter, useParams} from "next/navigation";
import {Sidebar} from "@/domain/chat/components/Sidebar";
import {ChatHeader} from "@/domain/chat/components/ChatHeader";
import {MessageList, Message} from "@/domain/chat/components/MessageList";
import {ChatInput} from "@/domain/chat/components/ChatInput";
import {
} from "@/shared/data/dummyData";
import { useUiStore } from "@/shared/store/uiStore";
import {useGetChatList} from "@/domain/chat/api/chat/query";
import {useAuthStore} from "@/shared/store/authStore";

export default function ChatPage() {
    const router = useRouter();
    const params = useParams();
    const channelId = params.id as string;

    const { isSidebarOpen, setIsSidebarOpen } = useUiStore();
    const userName = useAuthStore(s => s.name);

    const [messages, setMessages] = useState<Message[]>([]);

    const {data} = useGetChatList({
        channelId: Number(channelId),
        lastId: null,
        limit: 20,
    })

    const chatList = data?.data ?? [];
    console.log(chatList);

    const handleSendMessage = (message: string) => {
        // 새 메시지 추가 (더미)
        // const newMessage: Message = {
        //     id: String(messages.length + 1),
        //     message,
        //     timestamp: new Date().toLocaleTimeString("ko-KR", {
        //         hour: "2-digit",
        //         minute: "2-digit",
        //     }),
        // };
        // setMessages([...messages, newMessage]);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar
                userName={userName}
                userStatus="🟢 온라인"
                activeChannelId={channelId}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col bg-[#faf9fc] min-w-0">
                <ChatHeader
                    channelId={Number(channelId)}
                    onlineCount={5}
                    onMembers={() => console.log("Members")}
                    onMore={() => console.log("More")}
                    onMenuClick={() => setIsSidebarOpen(true)}
                />

                <MessageList messages={chatList}/>

                <ChatInput
                    onSend={handleSendMessage}
                    onAttach={() => console.log("Attach")}
                    onEmoji={() => console.log("Emoji")}
                />
            </div>
        </div>
    );
}
