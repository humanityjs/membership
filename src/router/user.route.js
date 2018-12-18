import express from 'express';
import userController from '../controllers/user.controller';

const router = express.Router();

router.param('id', userController.findById);

router.route('/users')
  .get(userController.findAll)
  .post(userController.create);

router.route('/users/:id')
  .get(userController.read)
  .put(userController.update)
  .delete(userController.delete);

export default router;
