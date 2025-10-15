"use client";

import { ProfileHeader } from "./ProfileHeader";
import { SiloList, Channel } from "./SiloList";
import { cn } from "@/shared/lib/utils";
import useSiloDialog from "@/domain/chat/hook/useSiloDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";

interface SidebarProps {
    userName: string;
    userStatus: string;
    activeChannelId?: string;
    isOpen?: boolean;
    onClose?: () => void;
}

export function Sidebar({
    userName,
    userStatus,
    activeChannelId,
    isOpen = true,
    onClose,
}: SidebarProps) {
    // 사일로 목록 쿼리
    // dialog actions / state
    const {
        isOpen: dialogOpen,
        mode,
        name: dialogName,
        setName: setDialogName,
        openSilo,
        close,
        submitSilo,
        submitChannel,
        createSiloMut,
        createChannelMut,
    } = useSiloDialog();

    // dialog state is consumed via useDialogActions; no local usage needed

    return (
        <>
            {/* 모바일 오버레이 */}
            {isOpen && onClose && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* 사이드바 */}
            <div
                className={cn(
                    "w-80 bg-white flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.08)]",
                    // 모바일: 절대 위치, 슬라이드 애니메이션
                    "fixed md:relative inset-y-0 left-0 z-50 transition-transform duration-300",
                    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                )}
            >
                <ProfileHeader
                    name={userName}
                    status={userStatus}
                    onNewChat={openSilo}
                />

                <SiloList
                    activeChannelId={activeChannelId}
                />
            </div>

            {/* Global dialog rendered here in Sidebar */}
            <Dialog open={dialogOpen} onOpenChange={(v) => (v ? null : close())}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{mode === 'silo' ? '사일로 등록' : '채널 추가'}</DialogTitle>
                    </DialogHeader>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (mode === 'silo') submitSilo();
                            else submitChannel();
                        }}
                        className="space-y-3"
                    >
                        <Input autoFocus value={dialogName} onChange={(e) => setDialogName(e.target.value)} placeholder={mode === 'silo' ? '사일로 이름' : '채널명 (예: 일반)'} />

                        <DialogFooter>
                            <div className="flex gap-2">
                                <Button type="button" variant="outline" onClick={() => close()}>취소</Button>
                                <Button type="submit" disabled={mode === 'silo' ? createSiloMut.isPending : createChannelMut.isPending}>{mode === 'silo' ? (createSiloMut.isPending ? '생성중...' : '생성') : (createChannelMut.isPending ? '생성중...' : '생성')}</Button>
                            </div>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}