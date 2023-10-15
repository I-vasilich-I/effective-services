import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import userService from './user.service.js';
import CreateUserDto from './dto/create-user.dto.js';

class UserController {
  async getAll(req, res, next) {
    try {
      const users = await userService.getAll();
      res.status(StatusCodes.OK);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        next(errors.array());
      }

      const { id } = req.params;
      const user = await userService.update(Number(id), req.body);
      res.status(StatusCodes.OK);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        next(errors.array());
      }

      const createUserDto = new CreateUserDto(req.body);
      const user = await userService.create(createUserDto);
      res.status(StatusCodes.CREATED);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
