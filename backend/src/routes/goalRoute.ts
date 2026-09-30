import { Router } from "express";
import { GoalController } from "../controllers/goalController";

const router: Router = Router();

router.get('/', GoalController.getGoals);
router.get('/:id', GoalController.getGoal);
router.post('/', GoalController.postGoal);
router.put('/:id', GoalController.putGoal);

export default router;
