import { axiosClient } from "@/lib/axiosClient";

import type {
    ResponseType,
    GetUserType,
    GetAuthUserType,
    AuthRegisterBodyType,
    AuthLoginBodyType,
} from '@definethefuture/contracts'


const authApis = {
    getCurrentUser: async (): Promise<ResponseType<GetUserType>> => {
        const response = await axiosClient.get<ResponseType<GetUserType>>('/auth/me');
        return response.data;
    },
    postRegister: async (body: AuthRegisterBodyType): Promise<ResponseType<GetAuthUserType>> => {
        const response = await axiosClient.post<ResponseType<GetAuthUserType>>('/auth/register', body);
        return response.data;
    },
    postLogin: async (body: AuthLoginBodyType): Promise<ResponseType<unknown>> => {
        const response = await axiosClient.post<ResponseType<unknown>>('/auth/login', body);
        return response.data;
    },
    postLogout: async (): Promise<ResponseType<unknown>> => {
        const response = await axiosClient.post<ResponseType<unknown>>('/auth/logout');
        return response.data;
    },
}

export default authApis;
