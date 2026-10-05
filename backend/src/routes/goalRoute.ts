import { Router } from "express";
import { GoalController } from "../controllers/goalController";
import { validateRequest } from "../middlewares/validateMiddleware";
import {
    GetGoalParamsSchema,
    GetGoalsQuerySchema,
    CreateGoalBodySchema,
    EditGoalBodySchema,
    DeleteGoalParamsSchema,
    GetGoalQuerySchema,
} from "../schemas";
import { authenticate } from "../middlewares/authMiddleware";

const router: Router = Router();

router.get(
    '/',
    authenticate,
    validateRequest({ querySchema: GetGoalsQuerySchema }),
    GoalController.getGoals
);

router.get(
    '/:id',
    authenticate,
    validateRequest({ paramsSchema: GetGoalParamsSchema, querySchema: GetGoalQuerySchema }),
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

router.delete(
    '/:id',
    authenticate,
    validateRequest({ paramsSchema: DeleteGoalParamsSchema }),
    GoalController.deleteGoal
);

export default router;
