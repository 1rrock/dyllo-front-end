import {ChatListRequest, ChatNameRequest} from "@/domain/chat/api/chat/types";
import {useQuery} from "@tanstack/react-query";
import {getChatList, getChatName} from "@/domain/chat/api/chat/fetch";

export const CHAT_QUERY_KEYS = {
    chatList: 'chatList',
    chatDetail: (chatId: number | string) => ['chatDetail', chatId],
    channelList: 'channelList',
    channelDetail: (channelId: number | string) => ['channelDetail', channelId],
};

// You can add more hooks and query functions as needed for chat functionality
export function useGetChatList(params: ChatListRequest) {
    return useQuery({
        queryKey: [CHAT_QUERY_KEYS.chatList, params],
        queryFn: () => getChatList(params), // Uncomment and implement getChatList function
    })
}

export function useGetChatName(params: ChatNameRequest) {
    return useQuery({
        queryKey: [CHAT_QUERY_KEYS.chatDetail, params.channelId],
        queryFn: () => getChatName(params), // Uncomment and implement getChatName function
    })
}