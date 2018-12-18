import express from 'express';
import userController from '../controllers/user.controller';

const router = express.Router();

router.param('id', userController.findByIdMethod);

router.route('/users')
  .get(userController.findAllMethod)
  .post(userController.createMethod);

router.route('/users/:id')
  .get(userController.readMethod)
  .put(userController.updateMethod)
  .delete(userController.deleteMethod);

export default router;
