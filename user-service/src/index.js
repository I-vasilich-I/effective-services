import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './router/index.js';
import errorMiddleware from './middlewares/error.middleware.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/v1/api', router);
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on port:', PORT);
});
