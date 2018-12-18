import express from 'express';
import planController from '../controllers/plan.controller';
import validatorMiddleware from '../middlewares/validator.middleware';

const router = express.Router();

router.param('id', planController.findByIdMethod);

router.post('/plans', validatorMiddleware.checkPlan, planController.createMethod);

router.get('/plans', planController.findAllMethod)

router.route('/plans/:id')
  .get(planController.getUsersByPlan);

router.route('/plans/:id/add/:userId')
  .post(planController.addUserToPlan)

export default router;
