export interface ChatListRequest {
    channelId: number;
    lastId?: number;
    limit?: number;
}

export interface ChatListResponse {
    status: number;
    msg: string;
    data: ChatItem[];
}

export interface ChatItem {
    id: string
    channelId: number;
    memberId: number;
    nickName: string;
    message: string;
    timestamp: string;
}

export interface ChatNameRequest {
    channelId: number;
}

export interface ChatNameResponse {
    status: number;
    msg: string;
    data: string
}