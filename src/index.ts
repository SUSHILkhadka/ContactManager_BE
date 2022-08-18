import express, { Application, Request, Response } from 'express';
import errorHandler from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';
import logger from './misc/Logger';
import appRouter from './router/index';
import cors from 'cors';

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(cors({origin: /\.herokuapp\.com$/}));


// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// app.enableCors({
//   origin: true,
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//   credentials: true,
// }); 
// app.use(
//   cors({
//       origin: "http://localhost:3000", 
//       credentials: true,
//   })
// );
app.use(appRouter);
app.use(notFound); 
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info('successfully listening to port 5000');
});
