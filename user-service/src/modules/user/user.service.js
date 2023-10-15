import { hash } from 'bcrypt';
import prisma from '../prisma/prisma.service.js';
import UserDto from './dto/user.dto.js';
import UpdateUserDto from './dto/update-user.dto.js';

const HASH_ROUNDS = +process.env.HASH_ROUNDS || 10;

class UserService {
  async getAll() {
    const users = await prisma.user.findMany();

    return users.map((user) => new UserDto(user));
  }

  async create({ username, email, password }) {
    const hashPassword = await hash(password, HASH_ROUNDS);

    const user = await prisma.user.create({
      data: {
        email, password: hashPassword, username,
      },
    });

    return new UserDto(user);
  }

  async update(userId, data) {
    const updateUserDto = new UpdateUserDto(data);

    const updatedUser = await prisma.user.update({ where: { id: userId }, data: updateUserDto });

    return new UserDto(updatedUser);
  }
}

export default new UserService();
