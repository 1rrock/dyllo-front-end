import {ChatListRequest, ChatListResponse, ChatNameRequest, ChatNameResponse} from "@/domain/chat/api/chat/types";
import {authGet} from "@/shared/hooks/useAxios";

export async function getChatList(params: ChatListRequest): Promise<ChatListResponse> {
    const res = await authGet<ChatListResponse>("/api/v1/auth/chat/list", {params});
    return res.data;
}

export async function getChatName(params: ChatNameRequest): Promise<ChatNameResponse> {
    const res = await authGet<ChatNameResponse>("/api/v1/auth/channel/name", {params});
    return res.data;
}