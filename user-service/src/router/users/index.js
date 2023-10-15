import { Router } from 'express';
import { getAll } from '../../modules/users/users.controller.js';

const router = new Router();

router.get('/', getAll);

export default router;
