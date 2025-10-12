export interface CreateSiloRequest {
    name: string;
    visibility: "PUBLIC" | "PRIVATE";
}

export interface SiloItem {
    siloId: number;
    name: string;
}

export interface GetSilosResponse {
    status: number;
    msg: string;
    data: SiloItem[];
}

export interface CreateSiloResponse {
    status: number;
    msg: string;
    data: any;
}