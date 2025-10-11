// Join API Types

export interface JoinRequest {
  email: string;
  password: string;
  name: string;
}

export interface JoinResponse {
  success: boolean;
  message?: string;
}

export interface EmailDuplicateRequest {
  email: string;
}

export interface EmailDuplicateResponse {
  isDuplicate: boolean;
  message?: string;
}

export interface EmailCodeRequest {
  email: string;
}

export interface EmailCodeResponse {
  success: boolean;
  message?: string;
}

export interface EmailVerifyRequest {
  email: string;
  code: string;
}

export interface EmailVerifyResponse {
  success: boolean;
  message?: string;
}

