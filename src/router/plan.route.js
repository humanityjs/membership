import express from 'express';
import planController from '../controllers/plan.controller';

const router = express.Router();

router.param('id', planController.findByIdMethod);

router.route('/plans')
  .get(planController.findAllMethod)
  .post(planController.createMethod);

router.route('/plans/:id')
  .get(planController.getUsersByPlan);

router.route('/plans/:id/add/:userId')
  .post(planController.addUserToPlan)

export default router;
