import {ChannelListRequest, ChannelListResponse, CreateChannelRequest, CreateChannelResponse} from "./types";
import {authGet, authPost} from "@/shared/hooks/useAxios";

export async function createChannelApi(body: CreateChannelRequest): Promise<CreateChannelResponse> {
    const res = await authPost<CreateChannelResponse>("/api/v1/auth/channel", body);
    return res.data;
}

export async function getChannelList(params: ChannelListRequest): Promise<ChannelListResponse> {
    const res = await authGet<ChannelListResponse>("/api/v1/auth/channel/list", {params});
    return res.data;
}
