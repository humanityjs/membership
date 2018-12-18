import baseController from './base.controller';
import User from '../db/user.model';
import Plan from '../db/plan.model';
import UserPlan from '../db/userplans.model';

class planController extends baseController {
  constructor (model) {
    super (model);
  }

  addUserToPlan = async (req, res) => {
    const userId = req.params.userId;
    const plan = req.docFromId;
    const {body} = req.body;
    const user = await this.findUserById(userId)

    if (!user) {
      return res.status(400).send({
        message: 'User not found'
      });
    }

    plan.users.push(user.id);

    user.plan = plan.id;

    const planToCreate = {...body, user: user.id, plan: plan.id};

    try {
      await this.update(this.model, plan);
      await this.update(User, user);
      await this.create(UserPlan, planToCreate);

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
