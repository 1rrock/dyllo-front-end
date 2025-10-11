"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
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
                <div className="flex flex-col items-center gap-8 w-full max-w-sm px-4">
                    <h1 className="flex md:hidden items-center gap-2 text-2xl font-bold text-white">
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
                    <Card className="w-full bg-white drop-shadow-2xl">
                        <CardHeader>
                            <CardTitle>로그인</CardTitle>
                            <CardDescription>
                                이메일을 입력하세요.
                            </CardDescription>
                            <CardAction>
                                <Button variant="link" onClick={() => router.push("/join")}>회원가입</Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleLogin}>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">이메일</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">비밀번호</Label>
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <a
                                            href="#"
                                            className="inline-block text-sm underline-offset-4 hover:underline text-primary"
                                        >
                                            비밀번호를 잊으셨나요?
                                        </a>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full" onClick={handleLogin}>
                                로그인
                            </Button>
                            <Button variant="outline" className="w-full" onClick={googleLogin}>
                                <SimpleIcon name="google"/>
                                Google
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </SsgoiTransition>
    );
}
