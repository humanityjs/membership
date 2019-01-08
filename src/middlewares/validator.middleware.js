import validate from '../validate';

import constants from '../constants';

import Plan from '../db/plan.model';

export default class ValidatorMiddleware {
  static checkUser = (req, res, next) => {
    const body = req.body;
    let errors = {};
    if (!body.firstName || !validate.isString(body.firstName)) {
      errors.firstName = 'Please provide a valid first name';
    }

    if (!body.lastName || !validate.isString(body.lastName)) {
      errors.lastName = 'Please provide a valid last name';
    }

    if (!body.dob || !validate.isString(body.dob)) {
      errors.dob = 'Please provide a valid date of birth';
    }

    if (!body.email || !validate.isString(body.email)) {
      errors.email = 'Please provide a valid email';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    next();
  }

  static checkPlan = async (req, res, next) => {
    const body = req.body;
    let errors = {};

    if (!body.name || !validate.isString(body.name)) {
      errors.name = 'Please provide a valid name';
    }

    try {
      const plan = await Plan.findOne({ name: body.name }).exec();
      if (plan) {
        errors.name = 'A plan with that name already exists';
      }
    } catch (e) {
      console.log(e.message);
    }

    if (!body.type || !validate.isString(body.type)) {
      errors.type = 'Please provide a valid type';
    }

    if (!constants.PLANS.includes(body.type)) {
      errors.type = `Plan must be one of ${constants.PLANS.toString()} `;
    }

    if (body.type === constants.TIME_BASED) {
      if (!body.startDate) {
        errors.startDate = `Please provide a start date`;
      }

      if (!body.endDate) {
        errors.endDate = `Please provide an end date`;
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    next();
  }

  static addPlanToUser = (req, res, next) => {
    const userId = req.params.userId;
    const plan = req.docFromId;

    let errors = {}

    if (!userId) {
      errors.userId = 'Please provide a valid user ID';
    }

    if (!plan) {
      errors.planId = 'Please provide a valid plan ID';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    next();
  }
}

