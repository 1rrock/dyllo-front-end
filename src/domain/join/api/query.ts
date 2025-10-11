// Join API Queries

import { useMutation } from "@tanstack/react-query";
import {
  joinUser,
  checkEmailDuplicate,
  sendEmailCode,
  verifyEmailCode,
} from "./fetch";
import type {
  JoinRequest,
  EmailDuplicateRequest,
  EmailCodeRequest,
  EmailVerifyRequest,
} from "./types";

// 회원가입 mutation
export const useJoinMutation = () => {
  return useMutation({
    mutationFn: (data: JoinRequest) => joinUser(data),
  });
};

// 이메일 중복 체크 mutation
export const useEmailDuplicateMutation = () => {
  return useMutation({
    mutationFn: (data: EmailDuplicateRequest) => checkEmailDuplicate(data),
  });
};

// 이메일 인증 코드 전송 mutation
export const useSendEmailCodeMutation = () => {
  return useMutation({
    mutationFn: (data: EmailCodeRequest) => sendEmailCode(data),
  });
};

// 이메일 인증 코드 확인 mutation
export const useVerifyEmailCodeMutation = () => {
  return useMutation({
    mutationFn: (data: EmailVerifyRequest) => verifyEmailCode(data),
  });
};

