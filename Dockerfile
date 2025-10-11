# Node.js 공식 이미지를 기반으로 합니다.
FROM node:20-alpine

# 작업 디렉토리 생성 및 설정
WORKDIR /app

# 종속성 설치를 위해 package.json과 lock 파일 복사
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* bun.lockb* ./

# 패키지 설치 (npm, yarn, pnpm, bun 중 하나를 자동 선택)
RUN if [ -f package-lock.json ]; then npm ci; \
    elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install --frozen-lockfile; \
    elif [ -f bun.lockb ]; then npm install -g bun && bun install; \
    else npm install; fi

# 소스 코드 복사
COPY . .

# Next.js 빌드
RUN npm run build

# 40000 포트 개방
EXPOSE 40000

# 앱 실행 (PORT 환경변수 지정)
ENV PORT=40000
CMD ["npm", "start"]
