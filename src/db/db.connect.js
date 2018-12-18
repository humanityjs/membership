import mongoose from 'mongoose';
import config from '../config/base.config';

async function connect () {
  try {
    await mongoose.connect(config.MONGO_URI, { useNewUrlParser: true });
    console.log('Db connected');
  } catch (e) {
    console.log(e.message);
  }
}

export default connect;
