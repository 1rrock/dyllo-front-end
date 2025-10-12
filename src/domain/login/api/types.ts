export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  msg: string;
  data: string; // accessToken
}

