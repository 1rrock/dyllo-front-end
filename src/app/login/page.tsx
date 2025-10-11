"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";
import {Button} from "@/shared/components/ui/button";
import {Input} from "@/shared/components/ui/input";
import {Label} from "@/shared/components/ui/label";
import Icon, {SimpleIcon} from "@/shared/components/ui/icon";
import Image from "next/image";
import {SsgoiTransition} from "@ssgoi/react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // 임시 로그인 로직 (쿠키 기반)
        if (email && password) {
            // 쿠키에 토큰 저장 (7일간 유효)
            document.cookie = `auth_token=temporary_token_12345; path=/; max-age=${60 * 60 * 24 * 7}`;
            document.cookie = `user_email=${email}; path=/; max-age=${60 * 60 * 24 * 7}`;
            router.push("/");
        }
    };

    const googleLogin = () => {
        // 구글 로그인 로직 (임시)
        const googleEmail = "zxcv1685@gmail.com"
        if (googleEmail) {
            document.cookie = `auth_token=google_token_12345; path=/; max-age=${60 * 60 * 24 * 7}`;
            document.cookie = `user_email=${googleEmail}; path=/; max-age=${60 * 60 * 24 * 7}`;
            router.push("/");
        }
    };

    return (
        <SsgoiTransition id="/login">
            <div className="flex min-h-screen flex-col items-center justify-center bg-white relative">
                <h1 className="absolute top-10 left-10 hidden md:flex items-center gap-2 text-2xl font-bold text-white">
                    <div className="relative w-[124px] h-[40px]">
                        <Image
                            src="/assets/icon/app-logo.png"
                            alt="앱 로고"
                            fill
                            priority
                            sizes="124px"
                            style={{objectFit: 'contain'}}
                        />
                    </div>
                </h1>
                <div className="w-full max-w-[440px]">
                    <Card variant="auth">
                        <CardContent variant="auth">
                            <div className="space-y-8">
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        로그인
                                    </h2>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        계정에 로그인하세요
                                    </p>
                                </div>

                                <form onSubmit={handleLogin} className="space-y-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                                            이메일
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="example@dyllo.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="h-12 rounded-xl border-2 text-base transition-all focus:border-[#667eea] focus:ring-4 focus:ring-[#667eea]/10"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                                            비밀번호
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="비밀번호를 입력하세요"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="h-12 rounded-xl border-2 text-base pr-12 transition-all focus:border-[#667eea] focus:ring-4 focus:ring-[#667eea]/10"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xl opacity-50 hover:opacity-80 transition-opacity"
                                            >
                                                👁️
                                            </button>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="gradient"
                                        size="xl"
                                        className="w-full"
                                    >
                                        로그인
                                    </Button>

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-gray-200" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-white px-2 text-gray-500">또는</span>
                                        </div>
                                    </div>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="xl"
                                        onClick={googleLogin}
                                        className="w-full bg-white border-2 border-gray-200 hover:bg-gray-50 gap-3"
                                    >
                                        <SimpleIcon name="google" className="w-5 h-5" />
                                        Google로 계속하기
                                    </Button>
                                </form>

                                <div className="text-center text-sm text-gray-600">
                                    계정이 없으신가요?{" "}
                                    <button
                                        type="button"
                                        onClick={() => router.push("/join")}
                                        className="text-[#667eea] font-semibold hover:underline"
                                    >
                                        회원가입
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <style jsx global>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </SsgoiTransition>
    );
}
