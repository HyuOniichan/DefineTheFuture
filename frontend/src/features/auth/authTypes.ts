import type { AuthLoginBodyType, AuthRegisterBodyType } from "@definethefuture/contracts";
import type { useApiLogin, useApiRegister } from "./authHooks";

export type AuthAccountInputType = AuthLoginBodyType | AuthRegisterBodyType;

export type AuthLoginMutationType = ReturnType<typeof useApiLogin>
export type AuthRegisterMutationType = ReturnType<typeof useApiRegister>
export type AuthMutationType = AuthLoginMutationType | AuthRegisterMutationType
