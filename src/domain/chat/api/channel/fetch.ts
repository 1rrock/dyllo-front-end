import { CreateChannelRequest, CreateChannelResponse } from "./types";
import { authPost } from "@/shared/hooks/useAxios";

export async function createChannelApi(body: CreateChannelRequest): Promise<CreateChannelResponse> {
  const res = await authPost<CreateChannelResponse>("/api/v1/auth/channel", body);
  return res.data;
}

