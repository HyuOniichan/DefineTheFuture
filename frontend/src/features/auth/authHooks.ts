import { useMutation, useQuery } from "@tanstack/react-query"
import authApis from "./authApis"
import queryClient from "@/lib/queryClient"
import type { AuthLoginBodyType, AuthRegisterBodyType } from "@definethefuture/contracts"
import { authCurrentUserOptions, authKeys, redirectLinkOnSuccess } from "./authUtils"
import { useNavigate } from "@tanstack/react-router"

export const useApiGetMe = () => {
    return useQuery(authCurrentUserOptions);
}

export const useApiRegister = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: ({ body }: { body: AuthRegisterBodyType }) => authApis.postRegister(body),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: authKeys.all });
            await navigate({ to: redirectLinkOnSuccess.register });
        },
    })
}

export const useApiLogin = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: ({ body }: { body: AuthLoginBodyType }) => authApis.postLogin(body),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: authKeys.all });
            await navigate({ to: redirectLinkOnSuccess.login });
        },
    })
}

export const useApiLogout = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: () => authApis.postLogout(),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: authKeys.all });
            await navigate({ to: redirectLinkOnSuccess.logout });
        },
    })
}

