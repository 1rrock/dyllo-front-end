import {useGetChannelList} from "@/domain/chat/api/channel/query";
import {ChannelCard} from "@/shared/components/chat";
import {useUiStore} from "@/shared/store/uiStore";
import {useCurrentChannelStore} from "@/shared/store/currentChannelStore";

interface ChannelListProps {
    siloId: number;
    activeChannelId?: number;
}

const ChannelList = (
    {
        siloId,
        activeChannelId,
    }: ChannelListProps
) => {
    const {setIsSidebarOpen} = useUiStore();
    const setCurrentChannel = useCurrentChannelStore(s => s.setCurrentChannel);

    const {data, isPending} = useGetChannelList(siloId);

    if (isPending) return;
    const channelList = data.data;
    // setCurrentChannel

    return (
        <div className="mt-3 space-y-2">
            {channelList.map((item) => (
                <ChannelCard
                    key={item.channelId}
                    avatar=""
                    name={item.name}
                    preview=""
                    badge={0}
                    isActive={item.channelId === Number(activeChannelId)}
                    href={`/chat/${item.channelId}`}
                    onClick={() => {

                        setIsSidebarOpen(false);
                    }}
                />
            ))}
        </div>
    );
}
export default ChannelList;