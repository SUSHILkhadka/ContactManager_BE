import express, { Application } from 'express';
import errorHandler from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';
import logger from './misc/Logger';
import appRouter from './router/index';
import cors from 'cors';

const app: Application = express();
app.use(express.json());
app.use(cors());
app.options('*', cors)
// app.enableCors({
//   origin: true,
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//   credentials: true,
// }); 
app.use(appRouter);
app.use(notFound); 
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info('successfully listening to port 5000');
});
