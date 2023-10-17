import { Router } from 'express';
import { body } from 'express-validator';
import userController from '../../modules/user/user.controller.js';
import requestLoggerMiddleware from '../../middlewares/request-logger.middleware.js';

const router = new Router();

router.get('/', userController.getAll);

router.post(
  '/',
  body('username').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  requestLoggerMiddleware,
  userController.create,
);

router.put(
  '/:id',
  body('username').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  requestLoggerMiddleware,
  userController.update,
);

export default router;
