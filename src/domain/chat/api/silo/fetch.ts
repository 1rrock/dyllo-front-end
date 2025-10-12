import { CreateSiloRequest, GetSilosResponse, CreateSiloResponse } from "./types";
import { authPost, authGet } from "@/shared/hooks/useAxios";

export async function createSiloApi(body: CreateSiloRequest): Promise<CreateSiloResponse> {
  const res = await authPost<CreateSiloResponse>("/api/v1/auth/silo", body);
  return res.data;
}

export async function getMySilosApi(): Promise<GetSilosResponse> {
  const res = await authGet<GetSilosResponse>("/api/v1/auth/silo/my-list");
  return res.data;
}
