import * as z from "zod";

// 회원가입 폼 유효성 검증 스키마
export const joinSchema = z
  .object({
    email: z.string().email("올바른 이메일 주소를 입력해주세요."),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다."
      ),
    passwordConfirm: z.string(),
    name: z.string().min(2, "이름은 최소 2자 이상이어야 합니다."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export type JoinFormData = z.infer<typeof joinSchema>;

