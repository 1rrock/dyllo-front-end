"use client";
import { useCallback } from "react";
import { useDialogStore } from "@/shared/store/dialogStore";
import { useCreateChannel } from "@/domain/chat/api/channel/query";
import { useCreateSilo } from "@/domain/chat/api/silo/query";

export default function useSiloDialog() {
  const { isOpen, mode, selectedSilo, name, setName, openChannel, openSilo, close } = useDialogStore();

  const createChannelMut = useCreateChannel({
    onSuccess: () => {
      close();
    },
    onError: (err) => {
      const msg = err?.response?.data?.msg || err?.message || "채널 생성 중 오류가 발생했습니다.";
      alert(msg);
    },
  });

  const createSiloMut = useCreateSilo();

  const submitChannel = useCallback(() => {
    if (!selectedSilo) {
      alert("사일로를 선택해주세요.");
      return;
    }
    if (!name?.trim()) {
      alert("채널명을 입력해주세요.");
      return;
    }
    createChannelMut.mutate({ siloId: selectedSilo, name: name.trim(), channelType: "PUBLIC" });
  }, [selectedSilo, name, createChannelMut]);

  const submitSilo = useCallback(async () => {
    if (!name?.trim()) {
      alert("사일로명을 입력해주세요.");
      return;
    }
    try {
      await createSiloMut.mutateAsync({ name: name.trim(), visibility: "PUBLIC" });
      close();
    } catch (err: any) {
      alert(err?.response?.data?.msg || "사일로 생성 중 오류가 발생했습니다.");
    }
  }, [name, createSiloMut, close]);

  return {
    isOpen,
    mode,
    selectedSilo,
    name,
    setName,
    openChannel,
    openSilo,
    close,
    submitChannel,
    submitSilo,
    createChannelMut,
    createSiloMut,
  } as const;
}

