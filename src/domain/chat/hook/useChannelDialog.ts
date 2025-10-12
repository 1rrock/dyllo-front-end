import { useEffect, useState } from "react";
import { useCreateChannel } from "@/domain/chat/api/channel/query";

export type UseChannelDialogOptions = {
  onCreated?: (siloId: number) => void;
};

export default function useChannelDialog({ onCreated }: UseChannelDialogOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSilo, setSelectedSilo] = useState<number | null>(null);
  const [name, setName] = useState("");

  const mutation = useCreateChannel({
    onSuccess: (res) => {
      const siloId = res?.data?.siloId;
      if (siloId) {
        onCreated?.(siloId);
      }
      setIsOpen(false);
      setName("");
      setSelectedSilo(null);
    },
    onError: (err) => {
      const msg = err?.response?.data?.msg || err?.message || "채널 생성 중 오류가 발생했습니다.";
      // 최소한 alert는 남겨두고, 추후 토스트로 교체 가능
      alert(msg);
    },
  });

  useEffect(() => {
    if (!isOpen) {
      setSelectedSilo(null);
      setName("");
    }
  }, [isOpen]);

  const open = (siloId: number) => {
    setSelectedSilo(siloId);
    setName("");
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const submit = () => {
    if (!selectedSilo) return;
    if (!name.trim()) {
      alert("채널명을 입력해주세요.");
      return;
    }
    mutation.mutate({ siloId: selectedSilo, name: name.trim(), channelType: "PUBLIC" });
  };

  return {
    isOpen,
    open,
    close,
    selectedSilo,
    name,
    setName,
    submit,
    mutation,
  } as const;
}
