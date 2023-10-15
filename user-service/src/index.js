import dotenv from 'dotenv';
import express from 'express';
import router from './router/index.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/v1/api', router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on port:', PORT);
});
