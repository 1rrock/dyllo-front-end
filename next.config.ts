import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
    turbopack: {
        root: process.cwd(), // 현재 작업 디렉터리(절대경로)로 지정
    },
};

export default nextConfig;
