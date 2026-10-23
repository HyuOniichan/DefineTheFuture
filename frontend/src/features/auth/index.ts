import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {
    useApiGetMe,
    useApiRegister,
    useApiLogin,
    useApiLogout,
} from "./authHooks";
import type { 
    AuthAccountInputType,
    AuthLoginMutationType,
    AuthRegisterMutationType,
    AuthMutationType,
} from "./authTypes";
import {
    authCurrentUserOptions,
} from './authUtils';

export {
    LoginPage, RegisterPage,
    useApiGetMe, useApiRegister, useApiLogin, useApiLogout,
    authCurrentUserOptions,
}

export type {
    AuthAccountInputType,
    AuthLoginMutationType,
    AuthRegisterMutationType,
    AuthMutationType,
}
