import baseController from './base.controller';
import User from '../db/user.model';
import Plan from '../db/plan.model';

class userController extends baseController {
  constructor (model) {
    super (model);
  }

  deleteUser = async (req, res) => {
    const { docFromId } = req;
    try {
      const plan = await this.findById(Plan, docFromId.plan);
      if (plan) {
        plan.users.map((u) => u.toString());
        const updatedUsers = plan.users.filter((u) =>
          u.toString() !== docFromId._id.toString());
        plan.users = updatedUsers;
        await this.update(Plan, plan);
      }
      await this.delete(this.model, docFromId._id);
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (e) {
      return res.status(400).send({ message: 'Unable to delete user' });
    }
  }
}

export default new userController(User);
