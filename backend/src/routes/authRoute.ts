import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { validateRequest } from "../middlewares/validateMiddleware";
import { AuthLoginBodySchema, AuthRegisterBodySchema } from "../schemas";
import { authenticate } from "../middlewares/authMiddleware";

const router: Router = Router();

router.get(
    '/me',
    authenticate,
    AuthController.getCurrentUser
);

router.post(
    '/register',
    validateRequest({ bodySchema: AuthRegisterBodySchema }),
    AuthController.postRegister
);

router.post(
    '/login',
    validateRequest({ bodySchema: AuthLoginBodySchema }),
    AuthController.postLogin
);

router.post(
    '/logout',
    authenticate,
    AuthController.postLogout
);

export default router;
