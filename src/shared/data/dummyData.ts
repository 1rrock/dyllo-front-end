import { Channel } from "@/domain/chat/components/ChannelList";
import { Message } from "@/domain/chat/components/MessageList";

export const channels: Channel[] = [
    {
        id: "1",
        avatar: "#",
        name: "일반 채팅",
        preview: "민수: 좋아요! 😊",
        badge: 3,
    },
    {
        id: "2",
        avatar: "📢",
        name: "공지사항",
        preview: "새로운 업데이트가 있습니다",
    },
    {
        id: "3",
        avatar: "🎮",
        name: "게임 이야기",
        preview: "오늘 같이 게임 할 사람?",
        badge: 7,
    },
];

export const directMessages: Channel[] = [
    {
        id: "4",
        avatar: "철",
        name: "철수",
        preview: "내일 만날까?",
    },
    {
        id: "5",
        avatar: "영",
        name: "영희",
        preview: "사진 봤어!",
        badge: 1,
    },
];

// 채널별 메시지 데이터
export const channelMessages: Record<string, Message[]> = {
    "1": [
        {
            id: "1",
            type: "received",
            message: "안녕하세요! 새로운 프로젝트에 대해 이야기해볼까요?",
            time: "오후 2:30",
            avatar: "철",
            userName: "철수",
        },
        {
            id: "2",
            type: "received",
            message: "좋아요! 어떤 아이디어가 있으신가요?",
            time: "오후 2:32",
            avatar: "영",
            userName: "영희",
        },
        {
            id: "3",
            type: "sent",
            message: "채팅 앱을 만들어보면 어떨까요? 요즘 트렌드에 맞는 디자인으로!",
            time: "오후 2:34",
        },
        {
            id: "4",
            type: "received",
            message: "저도 참여하고 싶어요! 디자인 쪽으로 도움을 드릴 수 있습니다 😊",
            time: "오후 2:35",
            avatar: "민",
            userName: "민수",
        },
        {
            id: "5",
            type: "sent",
            message: "완벽해요! 다같이 만들어봐요 🚀",
            time: "오후 2:36",
        },
    ],
    "2": [
        {
            id: "1",
            type: "received",
            message: "📢 새로운 기능이 추가되었습니다!",
            time: "오전 10:00",
            avatar: "📢",
            userName: "관리자",
        },
        {
            id: "2",
            type: "received",
            message: "앱 버전 2.0이 출시되었습니다. 많은 이용 부탁드립니다!",
            time: "오전 10:01",
            avatar: "📢",
            userName: "관리자",
        },
    ],
    "3": [
        {
            id: "1",
            type: "received",
            message: "오늘 저녁 7시에 게임 어때요?",
            time: "오후 3:00",
            avatar: "게",
            userName: "게이머",
        },
        {
            id: "2",
            type: "sent",
            message: "좋아요! 참여할게요 🎮",
            time: "오후 3:05",
        },
        {
            id: "3",
            type: "received",
            message: "저도 참여하고 싶어요!",
            time: "오후 3:10",
            avatar: "프",
            userName: "프로게이머",
        },
    ],
    "4": [
        {
            id: "1",
            type: "received",
            message: "내일 만날까?",
            time: "오후 1:00",
            avatar: "철",
            userName: "철수",
        },
        {
            id: "2",
            type: "sent",
            message: "좋아! 몇 시에 어디서 만날까?",
            time: "오후 1:05",
        },
        {
            id: "3",
            type: "received",
            message: "3시에 강남역 어때?",
            time: "오후 1:10",
            avatar: "철",
            userName: "철수",
        },
    ],
    "5": [
        {
            id: "1",
            type: "received",
            message: "사진 봤어!",
            time: "오후 4:00",
            avatar: "영",
            userName: "영희",
        },
        {
            id: "2",
            type: "sent",
            message: "어떤 사진?",
            time: "오후 4:02",
        },
        {
            id: "3",
            type: "received",
            message: "어제 올린 여행 사진! 정말 예쁘더라 😍",
            time: "오후 4:03",
            avatar: "영",
            userName: "영희",
        },
    ],
};

// 채널 정보 가져오기
export const getChannelById = (id: string): Channel | undefined => {
    return [...channels, ...directMessages].find(channel => channel.id === id);
};

// 채널 메시지 가져오기
export const getMessagesByChannelId = (id: string): Message[] => {
    return channelMessages[id] || [];
};

// 모든 채널 가져오기
export const getAllChannels = () => {
    return [...channels, ...directMessages];
};

