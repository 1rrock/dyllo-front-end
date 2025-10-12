import { useMutation } from "@tanstack/react-query";
import { loginApi } from "./fetch";
import { LoginRequest, LoginResponse } from "./types";

export function useLoginMutation() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: loginApi,
  });
}
