import { Router } from "express";
import { UserController } from "../controllers/userController";
import { validateRequest } from "../middlewares/requestValidator";
import { GetUserParamsSchema } from "../schemas";

const router: Router = Router();

router.get(
    '/', 
    UserController.getUsers
);

router.get(
    '/:id', 
    validateRequest({ paramsSchema: GetUserParamsSchema }), 
    UserController.getUser
);

export default router;
