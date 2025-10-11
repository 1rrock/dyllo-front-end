"use client";

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {SsgoiTransition} from "@ssgoi/react";
import {
    Card,
    CardContent,
} from "@/shared/components/ui/card";
import {Button} from "@/shared/components/ui/button";
import {Input} from "@/shared/components/ui/input";
import {Label} from "@/shared/components/ui/label";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import {
    useJoinMutation,
    useEmailDuplicateMutation,
    useSendEmailCodeMutation,
    useVerifyEmailCodeMutation,
} from "@/domain/join/api/query";
import {joinSchema, type JoinFormData} from "@/domain/join/api/schema";
import Image from "next/image";

export default function JoinPage() {
    const router = useRouter();
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [verificationCode, setVerificationCode] = useState("");
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600); // 10분

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<JoinFormData>({
        resolver: zodResolver(joinSchema),
        mode: "onChange",
    });

    const email = watch("email");

    // Mutations
    const emailDuplicateMutation = useEmailDuplicateMutation();
    const sendEmailCodeMutation = useSendEmailCodeMutation();
    const verifyEmailCodeMutation = useVerifyEmailCodeMutation();
    const joinMutation = useJoinMutation();

    // 타이머
    useEffect(() => {
        if (step === 2 && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [step, timeLeft]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    // Step 1: 이메일 중복 체크 및 인증 코드 전송
    const handleEmailCheck = async () => {
        if (!email || errors.email) {
            return;
        }

        try {
            const result = await emailDuplicateMutation.mutateAsync({email});
            if (result.isDuplicate) {
                alert(result.msg || result.message || "이미 사용 중인 이메일입니다.");
                return;
            }

            // 인증 코드 전송
            await sendEmailCodeMutation.mutateAsync({email});
            setTimeLeft(600); // 타이머 리셋
            setStep(2);
        } catch (error) {
            alert("이메일 확인에 실패했습니다.");
            console.error(error);
        }
    };

    // Step 2: 인증 코드 재전송
    const handleResendCode = async () => {
        try {
            await sendEmailCodeMutation.mutateAsync({email});
            setTimeLeft(600);
            alert("인증 코드가 재전송되었습니다.");
        } catch (error) {
            alert("인증 코드 전송에 실패했습니다.");
            console.error(error);
        }
    };

    // Step 2: 인증 코드 확인
    const handleVerifyCode = async () => {
        if (verificationCode.length !== 6) {
            alert("6자리 인증 코드를 입력해주세요.");
            return;
        }

        try {
            const result = await verifyEmailCodeMutation.mutateAsync({
                email,
                code: verificationCode,
            });
            if (result.success) {
                setIsEmailVerified(true);
                setStep(3);
                // 2초 후 Step 4로 이동
                setTimeout(() => {
                    setStep(4);
                }, 2000);
            } else {
                alert("인증 코드가 일치하지 않습니다.");
            }
        } catch (error) {
            alert("인증 코드 확인에 실패했습니다.");
            console.error(error);
        }
    };

    // Step 4: 회원가입
    const onSubmit = async (data: JoinFormData) => {
        if (!isEmailVerified) {
            alert("이메일 인증을 완료해주세요.");
            return;
        }

        try {
            await joinMutation.mutateAsync({
                email: data.email,
                password: data.password,
                name: data.name,
            });
            alert("회원가입이 완료되었습니다!");
            router.push("/login");
        } catch (error) {
            alert("회원가입에 실패했습니다.");
            console.error(error);
        }
    };

    return (
        <SsgoiTransition id="/join">
            <div className="flex min-h-screen items-center justify-center p-5">
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
                            {/* Step Indicator */}
                            <div className="flex justify-center gap-2 mb-8">
                                {[1, 2, 3, 4].map((s) => (
                                    <div
                                        key={s}
                                        className={`h-2 rounded transition-all duration-300 ${
                                            step === s
                                                ? "w-6 bg-gradient-to-r from-[#667eea] to-[#764ba2]"
                                                : "w-2 bg-gray-200"
                                        }`}
                                    />
                                ))}
                            </div>

                            {/* Step 1: 이메일 입력 */}
                            {step === 1 && (
                                <div className="space-y-8">
                                    <div className="text-center">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                            회원가입
                                        </h2>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            이메일 주소를 입력해주세요
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                                            이메일
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="example@dyllo.com"
                                            className="h-12 rounded-xl border-2 text-base transition-all focus:border-[#667eea] focus:ring-4 focus:ring-[#667eea]/10"
                                            {...register("email")}
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-red-500">{errors.email.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Button
                                            type="button"
                                            onClick={handleEmailCheck}
                                            disabled={emailDuplicateMutation.isPending || sendEmailCodeMutation.isPending}
                                            variant="gradient"
                                            size="xl"
                                            className="w-full"
                                        >
                                            {emailDuplicateMutation.isPending || sendEmailCodeMutation.isPending
                                                ? "처리 중..."
                                                : "인증 코드 받기"}
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => router.push("/login")}
                                            variant="secondary"
                                            size="xl"
                                            className="w-full bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-all"
                                        >
                                            취소
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: 이메일 인증 */}
                            {step === 2 && (
                                <div className="space-y-8">
                                    <div className="text-center">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                            이메일 인증
                                        </h2>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            <span className="font-semibold">{email}</span>으로
                                            <br/>
                                            인증 코드를 발송했습니다
                                        </p>
                                    </div>

                                    <div className="bg-blue-50 border-l-4 border-[#667eea] p-3 rounded-lg">
                                        <p className="text-sm text-blue-900 leading-relaxed">
                                            📧 이메일을 확인하고 6자리 인증 코드를 입력해주세요
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="code" className="text-sm font-semibold text-gray-700">
                                            인증 코드
                                        </Label>
                                        <div className="flex justify-center">
                                            <InputOTP
                                                maxLength={6}
                                                value={verificationCode}
                                                onChange={(value) => setVerificationCode(value)}
                                            >
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} className="w-12 h-12 text-xl"/>
                                                    <InputOTPSlot index={1} className="w-12 h-12 text-xl"/>
                                                    <InputOTPSlot index={2} className="w-12 h-12 text-xl"/>
                                                    <InputOTPSlot index={3} className="w-12 h-12 text-xl"/>
                                                    <InputOTPSlot index={4} className="w-12 h-12 text-xl"/>
                                                    <InputOTPSlot index={5} className="w-12 h-12 text-xl"/>
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </div>
                                    </div>

                                    <Button
                                        type="button"
                                        onClick={handleVerifyCode}
                                        disabled={verifyEmailCodeMutation.isPending || verificationCode.length !== 6}
                                        variant="gradient"
                                        size="xl"
                                        className="w-full"
                                    >
                                        {verifyEmailCodeMutation.isPending ? "확인 중..." : "인증하기"}
                                    </Button>

                                    <div className="text-center text-sm text-gray-600">
                                        코드가 만료되었나요?{" "}
                                        <button
                                            type="button"
                                            onClick={handleResendCode}
                                            className="text-[#667eea] font-semibold hover:underline"
                                            disabled={sendEmailCodeMutation.isPending}
                                        >
                                            재전송
                                        </button>
                                        <span className="ml-1 text-[#764ba2] font-semibold">
                      ({formatTime(timeLeft)})
                    </span>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: 인증 성공 */}
                            {step === 3 && (
                                <div className="space-y-8 text-center">
                                    <div
                                        className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-3xl animate-[scaleIn_0.5s_ease]">
                                        ✓
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                            인증 완료!
                                        </h2>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            이메일 인증이 완료되었습니다.
                                            <br/>
                                            계속해서 정보를 입력해주세요.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Step 4: 회원 정보 입력 */}
                            {step === 4 && (
                                <div className="space-y-8">
                                    <div className="text-center">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                            정보 입력
                                        </h2>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            거의 다 왔어요! 마지막 정보를 입력해주세요
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                                                이름
                                            </Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder="홍길동"
                                                className="h-12 rounded-xl border-2 text-base transition-all focus:border-[#667eea] focus:ring-4 focus:ring-[#667eea]/10"
                                                {...register("name")}
                                            />
                                            {errors.name && (
                                                <p className="text-sm text-red-500">{errors.name.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                                                비밀번호
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="password"
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="8자 이상 입력해주세요"
                                                    className="h-12 rounded-xl border-2 text-base pr-12 transition-all focus:border-[#667eea] focus:ring-4 focus:ring-[#667eea]/10"
                                                    {...register("password")}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xl opacity-50 hover:opacity-80 transition-opacity"
                                                >
                                                    👁️
                                                </button>
                                            </div>
                                            {errors.password && (
                                                <p className="text-sm text-red-500">{errors.password.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="passwordConfirm"
                                                   className="text-sm font-semibold text-gray-700">
                                                비밀번호 확인
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="passwordConfirm"
                                                    type={showPasswordConfirm ? "text" : "password"}
                                                    placeholder="비밀번호를 다시 입력해주세요"
                                                    className="h-12 rounded-xl border-2 text-base pr-12 transition-all focus:border-[#667eea] focus:ring-4 focus:ring-[#667eea]/10"
                                                    {...register("passwordConfirm")}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xl opacity-50 hover:opacity-80 transition-opacity"
                                                >
                                                    👁️
                                                </button>
                                            </div>
                                            {errors.passwordConfirm && (
                                                <p className="text-sm text-red-500">{errors.passwordConfirm.message}</p>
                                            )}
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={joinMutation.isPending}
                                            variant="gradient"
                                            size="xl"
                                            className="w-full"
                                        >
                                            {joinMutation.isPending ? "가입 중..." : "회원가입 완료"}
                                        </Button>
                                    </form>
                                </div>
                            )}
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

                @keyframes scaleIn {
                    from {
                        transform: scale(0);
                    }
                    to {
                        transform: scale(1);
                    }
                }
            `}</style>
        </SsgoiTransition>
    );
}
