import mongoose from 'mongoose';

const schema = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan'
  },

  startDate: {
    type: Date,
    default: new Date()
  },

  endDate: {
    type: Date
  }
}

const userPlanSchema = new mongoose.Schema(schema);

const UserPlan = mongoose.model('UserPlan', userPlanSchema);

export default UserPlan;
