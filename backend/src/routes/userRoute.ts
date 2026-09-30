import { Router } from "express";
import { UserController } from "../controllers/userController";

const router: Router = Router();

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUser);

export default router;
