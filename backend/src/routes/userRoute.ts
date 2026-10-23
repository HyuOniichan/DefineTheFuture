import { Router } from "express";
import { UserController } from "../controllers/userController";
import { validateRequest } from "../middlewares/validateMiddleware";
import { GetUserParamsSchema } from "@definethefuture/contracts";
import { authenticate, authorize } from "../middlewares/authMiddleware";
import { ROLES } from "@definethefuture/contracts";

const router: Router = Router();

router.get(
    '/', 
    authenticate,
    authorize(ROLES.ADMIN),
    UserController.getUsers
);

router.get(
    '/:id',
    authenticate,
    authorize(ROLES.ADMIN),
    validateRequest({ paramsSchema: GetUserParamsSchema }), 
    UserController.getUser
);

export default router;
