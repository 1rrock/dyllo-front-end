import * as z from "zod";

export const loginSchema = z.object({
    email: z.string(),
    password: z.string().min(6, {message: "비밀번호는 최소 6자 이상이어야 합니다."}),
});

