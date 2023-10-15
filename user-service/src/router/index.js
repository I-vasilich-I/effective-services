import { Router } from 'express';
import usersRouter from './user/index.js';

const router = new Router();

router.use('/users', usersRouter);

export default router;
