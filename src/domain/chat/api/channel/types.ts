export interface CreateChannelRequest {
  siloId: number;
  name: string;
  channelType: "PUBLIC" | "PRIVATE" | "DM";
}

export interface ChannelItem {
  channelId: number;
  name: string;
  siloId: number;
  channelType: string;
}

export interface CreateChannelResponse {
  status: number;
  msg: string;
  data: ChannelItem;
}

export interface ChannelListRequest {
  siloId: number;
}

export interface ChannelListResponse {
  status: number;
  msg: string;
  data: ChannelListItem[];
}

export interface ChannelListItem {
    channelId: number;
    name: string;
}