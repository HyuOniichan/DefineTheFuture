import { Router } from "express";
import { GoalController } from "../controllers/goalController";
import { validateRequest } from "../middlewares/requestValidator";
import { 
    GetGoalParamsSchema, 
    GetGoalsQuerySchema, 
    CreateGoalBodySchema, 
    EditGoalBodySchema, 
} from "../schemas";

const router: Router = Router();

router.get(
    '/', 
    validateRequest({ querySchema: GetGoalsQuerySchema}),
    GoalController.getGoals
);

router.get(
    '/:id', 
    validateRequest({ paramsSchema: GetGoalParamsSchema }),
    GoalController.getGoal
);

router.post(
    '/', 
    validateRequest({ bodySchema: CreateGoalBodySchema }),
    GoalController.postGoal
);

router.put(
    '/:id', 
    validateRequest({ bodySchema: EditGoalBodySchema }),
    GoalController.putGoal
);

export default router;
