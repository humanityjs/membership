import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import config from './config/base.config';
import dbconnection from './db/db.connect';
import userRoutes from './router/user.route';
import planRoutes from './router/plan.route';

dbconnection();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

app.use('/api/v1', userRoutes);

app.use('/api/v1', planRoutes);

app.get('/', (req, res) => {
  return res.send('Welcome to membership API');
});

app.use((err, req, res, next) => {
  console.log(err.message);
  return res.status(500).json(err.message);
});


app.listen(config.PORT, () => {
  console.info(`App started on localhost:${config.PORT}`);
});


export default app;

