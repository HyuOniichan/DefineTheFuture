
export type ResponseStatusType = "success" | "failed" | "error";

export type ResponseType<T> = {
    status: ResponseStatusType,
    message?: string,
    data?: T,
}
