import { Router } from "express";
import { GoalController } from "../controllers/goalController";
import { validateRequest } from "../middlewares/validateMiddleware";
import { 
    GetGoalParamsSchema, 
    GetGoalsQuerySchema, 
    CreateGoalBodySchema, 
    EditGoalBodySchema, 
} from "../schemas";
import { authenticate } from "../middlewares/authMiddleware";

const router: Router = Router();

router.get(
    '/', 
    authenticate,
    validateRequest({ querySchema: GetGoalsQuerySchema}),
    GoalController.getGoals
);

router.get(
    '/:id', 
    authenticate,
    validateRequest({ paramsSchema: GetGoalParamsSchema }),
    GoalController.getGoal
);

router.post(
    '/', 
    authenticate,
    validateRequest({ bodySchema: CreateGoalBodySchema }),
    GoalController.postGoal
);

router.put(
    '/:id', 
    authenticate,
    validateRequest({ bodySchema: EditGoalBodySchema }),
    GoalController.putGoal
);

export default router;
