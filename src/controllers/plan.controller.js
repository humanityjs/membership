import baseController from './base.controller';
import User from '../db/user.model';
import Plan from '../db/plan.model';

class planController extends baseController {
  constructor (model) {
    super (model);
  }

  addUserToPlan = async (req, res) => {
    const userId = req.params.userId;
    const plan = req.docFromId;
    const user = await this.findUserById(userId)

    if (!user) {
      return res.status(400).send({
        message: 'User not found'
      });
    }

    const planusers = plan.users.map((u) => u.toString());
    const userIndex = planusers.findIndex((i) => i === user.id);

    if (userIndex >= 0) {
      return res.status(400).json({ message: 'The user is already on this plan'});
    }

    plan.users.push(user.id);

    user.plan = plan.id;

    try {
      await this.update(this.model, plan);
      await this.update(User, user);

      return res.json({ 
        message: `User successfully added to the ${plan.name} plan`
      });
    } catch (e) {
      return res.status(500).send({ message: 'Something went wrong' });
    }
  }

  findUserById = async (userId) => {
    try {
      return this.findById(User, userId);
    } catch (e) {
      return null;
    }
  }

  getUsersByPlan = async (req, res) => {
    const {id} = req.docFromId;
    console.log(id);
    try {
      const result = await this.model.findById(id)
        .populate('users')
        .exec();
      return res.json(result.users);
    } catch (e) {
      console.log(e.message);
      return res.status(500).send({ message: 'An error occured' });
    }
  }
}

export default new planController(Plan);
