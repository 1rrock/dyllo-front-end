"use client"

import {ChannelCard} from "@/shared/components/chat/ChannelCard";
import {SectionTitle} from "@/shared/components/chat/SectionTitle";
import {useUiStore} from "@/shared/store/uiStore";
import {useState} from "react";
import {useDialogStore} from "@/shared/store/dialogStore";
import {ChevronDown, ChevronUp} from "lucide-react";
import ChannelList from "@/domain/chat/components/ChannelList";
import {useGetMySilos} from "@/domain/chat/api/silo/query";

export interface Channel {
    id: string;
    avatar: string;
    name: string;
    preview?: string;
    badge?: number;
}

export interface Silo {
    siloId: number;
    name: string;
    channels?: Channel[];
}

interface ChannelListProps {
    activeChannelId?: string;
}

export function SiloList(
    {
        activeChannelId,
    }: ChannelListProps
) {
    const { data: siloRes } = useGetMySilos();
    const silos = siloRes?.data ?? [];

    const openChannelDialog = useDialogStore((s) => s.openChannel);

    const toggleCollapse = (siloId: number) => {
    };

    const openCreateDialog = (siloId: number) => openChannelDialog(siloId);

    return (
        <div
            className="flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-indigo-200 [&::-webkit-scrollbar-thumb]:rounded">
            {/* 사일로 섹션들 */}
            {silos.map((silo) => (
                <div key={silo.siloId} className="mb-6 group">
                    <div className="flex items-center justify-between">
                        <div
                            className="flex items-center transition-transform duration-200 ease-out hover:translate-x-2">
                            {/*<button*/}
                            {/*    aria-label={`접기 ${silo.name}`}*/}
                            {/*    className="hidden text-sm px-2 py-1 rounded-md bg-white/80 hover:bg-white cursor-pointer group-hover:flex"*/}
                            {/*>*/}
                            {/*    {collapsed[silo.siloId] ? <ChevronDown className="w-4 h-4"/> :*/}
                            {/*        <ChevronUp className="w-4 h-4"/>}*/}
                            {/*</button>*/}
                            <SectionTitle title={silo.name}/>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                aria-label={`채널 추가 ${silo.name}`}
                                className="flex item-center text-sm px-2 py-1 rounded-md bg-white/80 hover:bg-white cursor-pointer"
                                onClick={() => openCreateDialog(silo.siloId)}
                            >
                                ➕
                            </button>
                        </div>
                    </div>

                    <ChannelList
                        siloId={silo.siloId}
                        activeChannelId={Number(activeChannelId)}
                    />
                </div>
            ))}
        </div>
    );
}
