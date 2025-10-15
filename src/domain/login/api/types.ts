export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  msg: string;
  data: {
      accessToken: string;
      refreshToken: string | null;
      memberId: number;
      name: string
  }
}

