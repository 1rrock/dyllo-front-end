// Join API Fetch Functions

import {
  JoinRequest,
  JoinResponse,
  EmailDuplicateRequest,
  EmailDuplicateResponse,
  EmailCodeRequest,
  EmailCodeResponse,
  EmailVerifyRequest,
  EmailVerifyResponse,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 회원가입
export const joinUser = async (data: JoinRequest): Promise<JoinResponse> => {
  const response = await fetch(`${API_URL}/api/v1/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("회원가입에 실패했습니다.");
  }

  return response.json();
};

// 이메일 중복 체크
export const checkEmailDuplicate = async (
  data: EmailDuplicateRequest
): Promise<EmailDuplicateResponse> => {
  const response = await fetch(`${API_URL}/api/v1/email/duplicate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  // status가 400이면 중복된 이메일
  if (result.status === 400) {
    return {
      isDuplicate: true,
      message: result.msg,
      status: result.status,
      msg: result.msg,
    };
  }

  return {
    isDuplicate: false,
    ...result,
  };
};

// 이메일 인증 코드 전송
export const sendEmailCode = async (
  data: EmailCodeRequest
): Promise<EmailCodeResponse> => {
  const response = await fetch(`${API_URL}/api/v1/email/code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("인증 코드 전송에 실패했습니다.");
  }

  return response.json();
};

// 이메일 인증 코드 확인
export const verifyEmailCode = async (
  data: EmailVerifyRequest
): Promise<EmailVerifyResponse> => {
  const response = await fetch(`${API_URL}/api/v1/email/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("인증 코드 확인에 실패했습니다.");
  }

  return response.json();
};
