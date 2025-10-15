import {useMutation, useQuery} from '@tanstack/react-query';
import {createChannelApi, getChannelList} from './fetch';
import {CreateChannelRequest, CreateChannelResponse} from './types';

export const CHANNEL_QUERY_KEYS = {
    mySilos: ['my-silos'],
    channels: (siloId: number | string) => ['channels', siloId],
};

export function useCreateChannel(options?: {
    onSuccess?: (data: CreateChannelResponse) => void;
    onError?: (err: any) => void;
}) {
    return useMutation({
        mutationFn: (body: CreateChannelRequest) => createChannelApi(body),
        ...options
    });
}

export function useGetChannelList(siloId: number) {
    return useQuery({
        queryKey: CHANNEL_QUERY_KEYS.channels(siloId),
        queryFn: () => getChannelList({siloId}),
        enabled: !!siloId,
        staleTime: 1000 * 60 * 5,
    });
}