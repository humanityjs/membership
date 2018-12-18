import express from 'express';
import userController from '../controllers/user.controller';
import validatorMiddleware from '../middlewares/validator.middleware';

const router = express.Router();

router.param('id', userController.findByIdMethod);

router.get('/users', userController.findAllMethod)

router.post('/users', validatorMiddleware.checkUser, userController.createMethod);

router.route('/users/:id')
  .get(userController.readMethod)
  .put(userController.updateMethod)
  .delete(userController.deleteMethod);

export default router;
