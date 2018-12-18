import mongoose from 'mongoose';

const schema = {
  name: {
    type: String,
    required: true
  },

  type: {
    type: String,
    enum : ['RECURRENT','TIME_BASED'],
    required: true
  },

  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}

const planSchema = new mongoose.Schema(schema);

const Plan = mongoose.model('Plan', planSchema);

export default Plan;
