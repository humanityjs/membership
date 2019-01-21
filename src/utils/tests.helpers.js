import Plan from '../db/plan.model';
import User from '../db/user.model';

export const random = function () {
  return Math.round(Math.random() * 100000);
};

export const createPlan = function () {
  const plan = {
    name: `Plan ${random()}`,
    type: 'RECURRENT',
  };

  return Plan.create(plan);
};

export const createUser = function () {
  const user = {
    firstName: 'Test',
    lastName: 'User',
    dob: new Date(),
    email: `test${random()}@email.com`
  }

  return User.create(user);
};
