import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createChannelApi } from './fetch';
import { CreateChannelRequest, CreateChannelResponse } from './types';

export const CHANNEL_QUERY_KEYS = {
  mySilos: ['my-silos'],
  channels: (siloId: number | string) => ['channels', siloId],
};

export function useCreateChannel(options?: {
  onSuccess?: (data: CreateChannelResponse) => void;
  onError?: (err: any) => void;
}) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateChannelRequest) => createChannelApi(body),
    onSuccess: (data) => {
      // invalidate channels for the silo
      const siloId = data?.data?.siloId;
      if (siloId) {
        qc.invalidateQueries({ queryKey: CHANNEL_QUERY_KEYS.channels(siloId) });
      }
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}


