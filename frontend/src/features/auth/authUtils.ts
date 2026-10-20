import { queryOptions } from "@tanstack/react-query"
import authApis from "./authApis"

export const authKeys = {
    all: ["auth"],
    me: () => [...authKeys.all, "me"],
}

export const redirectLinkOnSuccess = {
    register: '/login',
    login: '/',
    logout: '/login',
}

export const authCurrentUserOptions = queryOptions({
    queryKey: authKeys.me(),
    queryFn: () => authApis.getCurrentUser()
})
