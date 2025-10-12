import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createSiloApi, getMySilosApi} from "./fetch";
import {CreateSiloRequest} from "./types";

export function useGetMySilos() {
    return useQuery({
        queryKey: ["my-silos"],
        queryFn: getMySilosApi,
        staleTime: 1000 * 60 * 5,
    });
}

export function useCreateSilo() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (body: CreateSiloRequest) => createSiloApi(body),
        onSuccess: () => qc.invalidateQueries({queryKey: ["my-silos"]}),
    });
}


