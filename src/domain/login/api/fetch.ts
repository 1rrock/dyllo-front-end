import { LoginRequest, LoginResponse } from "./types";
import { post } from "@/shared/hooks/useAxios";

export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
  const res = await post<LoginResponse>("/api/v1/login", data);
  return res.data;
}

