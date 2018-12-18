import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import config from './config/base.config';
import dbconnection from './db/db.connect';
import userRoutes from './router/user.route';

dbconnection();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

app.use('/api/v1', userRoutes);

app.get('/', (req, res) => {
  return res.send('Welcome to membership API');
});


app.listen(config.PORT, () => {
  console.info(`App started on localhost:${config.PORT}`);
});
