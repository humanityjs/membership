import mongoose from 'mongoose';

const schema = {
  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  dob: {
    type: Date,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  }
}

const userSchema = new mongoose.Schema(schema);

const User = mongoose.model('User', userSchema);

export default User;
