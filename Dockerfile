# Node.js 20 기반의 Next.js 앱 빌드 및 실행
FROM node:20-alpine

WORKDIR /app

# 패키지 파일 복사 및 의존성 설치
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN npm install --legacy-peer-deps

# 소스 및 환경변수 복사
COPY . .
COPY .env .env

# Next.js 빌드
RUN npm run build

# 40000 포트 노출
EXPOSE 40000

# Next.js 앱 실행 (40000 포트, 0.0.0.0 바인딩)
CMD ["npm", "run", "start"]
