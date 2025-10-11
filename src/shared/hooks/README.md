# 공용 훅 폴더

이 폴더는 애플리케이션 전체에서 재사용 가능한 커스텀 훅을 포함합니다.

## 📝 예정된 훅

### useAuth
- 사용자 인증 상태 관리
- 로그인/로그아웃 로직

### useWebSocket
- 실시간 통신 연결
- 메시지 수신/발신

### useDebounce
- 입력 디바운싱

### useInfiniteScroll
- 무한 스크롤 구현

## 사용 예시
```typescript
import { useAuth } from "@/shared/hooks/useAuth";

function MyComponent() {
    const { user, login, logout } = useAuth();
    // ...
}
```
# 채팅 애플리케이션 폴더 구조

## 📁 전체 구조
```
src/
├── app/                    # Next.js 라우팅
│   ├── page.tsx           # 메인 채팅 페이지
│   ├── login/             
│   │   └── page.tsx       # 로그인 페이지
│   ├── layout.tsx         
│   └── globals.css        
│
├── domain/                 # 도메인별 비즈니스 로직 및 컴포넌트
│   └── chat/              
│       └── components/     # 채팅 도메인 컴포넌트
│           ├── Sidebar.tsx           # 사이드바 컨테이너
│           ├── ProfileHeader.tsx     # 프로필 헤더
│           ├── ChannelList.tsx       # 채널 목록
│           ├── ChatHeader.tsx        # 채팅 헤더
│           ├── MessageList.tsx       # 메시지 목록
│           ├── ChatInput.tsx         # 채팅 입력
│           └── index.ts              # Export 모음
│
├── shared/                 # 공용 리소스
│   ├── components/         # 공용 컴포넌트
│   │   ├── ui/            # Shadcn UI 컴포넌트
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   └── chat/          # 채팅 공용 컴포넌트
│   │       ├── Avatar.tsx            # 아바타 (sm/md/lg)
│   │       ├── Badge.tsx             # 뱃지 (읽지 않은 메시지)
│   │       ├── ChannelCard.tsx       # 채널 카드
│   │       ├── MessageBubble.tsx     # 메시지 버블
│   │       ├── DateDivider.tsx       # 날짜 구분선
│   │       ├── IconButton.tsx        # 아이콘 버튼
│   │       ├── SectionTitle.tsx      # 섹션 타이틀
│   │       └── index.ts              # Export 모음
│   │
│   ├── lib/               # 공용 유틸리티
│   │   └── utils.ts       # cn 등 유틸 함수
│   │
│   ├── hooks/             # 공용 훅 (향후 추가)
│   │   └── README.md
│   │
│   └── store/             # Zustand 전역 상태 (향후 추가)
│       └── README.md
│
├── middleware.ts          # Next.js 미들웨어 (인증 등)
└── public/
    └── assets/
        ├── icon/
        └── svgs/
```

---

## 🎯 컴포넌트 분류

### 📦 Shared Components (공용)
재사용 가능한 기본 UI 컴포넌트

- **Avatar**: 3가지 크기(sm/md/lg)를 지원하는 아바타
- **Badge**: 읽지 않은 메시지 개수 표시
- **ChannelCard**: 채널/DM 카드 (active 상태 지원)
- **MessageBubble**: sent/received 타입 메시지
- **DateDivider**: 메시지 사이 날짜 구분선
- **IconButton**: 원형 아이콘 버튼
- **SectionTitle**: 섹션 제목

### 🏗️ Domain Components (도메인별)
비즈니스 로직과 연결된 복합 컴포넌트

- **Sidebar**: 전체 사이드바 (ProfileHeader + ChannelList)
- **ProfileHeader**: 사용자 프로필 및 액션 버튼
- **ChannelList**: 채널 목록 관리
- **ChatHeader**: 채팅방 헤더 및 액션
- **MessageList**: 메시지 목록 및 스크롤
- **ChatInput**: 메시지 입력 및 전송

---

## 🔄 데이터 흐름

```
page.tsx (Container)
    ├── 상태 관리 (useState)
    │   ├── activeChannelId
    │   └── messages (향후 서버 데이터)
    │
    ├── 이벤트 핸들러
    │   ├── handleLogout
    │   ├── handleSendMessage
    │   └── handleChannelClick
    │
    └── 컴포넌트 렌더링
        ├── Sidebar (props 전달)
        │   ├── ProfileHeader
        │   └── ChannelList
        │       └── ChannelCard (shared)
        │
        └── ChatArea
            ├── ChatHeader
            ├── MessageList
            │   └── MessageBubble (shared)
            └── ChatInput
```

---

## 📝 타입 정의 위치

### Domain Types
```typescript
// domain/chat/components/ChannelList.tsx
export interface Channel {
    id: string;
    avatar: string;
    name: string;
    preview?: string;
    badge?: number;
}

// domain/chat/components/MessageList.tsx
export interface Message {
    id: string;
    type: "sent" | "received";
    message: string;
    time: string;
    avatar?: string;
    userName?: string;
}
```

---

## 🚀 향후 확장 계획

### 1. Hooks 추가 (`shared/hooks/`)
```typescript
// useChat.ts - 채팅 관련 로직
// useAuth.ts - 인증 관련 로직
// useWebSocket.ts - 실시간 통신
```

### 2. Store 추가 (`shared/store/`)
```typescript
// useChatStore.ts - 채팅 상태 관리
// useUserStore.ts - 유저 상태 관리
```

### 3. API Layer (`domain/chat/api/`)
```typescript
// chatApi.ts - 채팅 API 호출
// messageApi.ts - 메시지 CRUD
```

### 4. 비즈니스 로직 (`domain/chat/hooks/`)
```typescript
// useChatLogic.ts - 채팅 비즈니스 로직
// useMessageSend.ts - 메시지 전송 로직
```

---

## 💡 사용 예시

### 컴포넌트 Import
```typescript
// Shared 컴포넌트
import { Avatar, Badge, MessageBubble } from "@/shared/components/chat";

// Domain 컴포넌트
import { Sidebar, ChatHeader, MessageList } from "@/domain/chat/components";

// 타입
import type { Channel, Message } from "@/domain/chat/components";
```

### 새로운 페이지에서 재사용
```typescript
// app/dm/[userId]/page.tsx
import { MessageList, ChatInput } from "@/domain/chat/components";

export default function DMPage() {
    return (
        <>
            <MessageList messages={messages} />
            <ChatInput onSend={handleSend} />
        </>
    );
}
```

---

## 🎨 스타일 가이드

### Tailwind Classes
- 그라데이션: `from-[#667eea] to-[#764ba2]`
- 배경색: `bg-[#faf9fc]`, `bg-[#f0edf7]`
- 애니메이션: `animate-popIn` (tailwind.config.js에 정의됨)

### 컴포넌트 Props 패턴
- 필수 props는 타입에 `?` 없이 정의
- 이벤트 핸들러는 `on` prefix 사용
- 선택적 스타일링은 `className` prop 제공

---

## ✅ 완료된 작업
- [x] 폴더 구조 설계
- [x] Shared 컴포넌트 7개 생성
- [x] Domain 컴포넌트 6개 생성
- [x] page.tsx 리팩토링
- [x] 타입 정의 및 Export
- [x] 에러 없는 빌드 확인

## 🔜 다음 단계
- [ ] Hooks 폴더 구조화
- [ ] Zustand Store 설정
- [ ] API Layer 구현
- [ ] WebSocket 연결
- [ ] 실제 데이터 연동

