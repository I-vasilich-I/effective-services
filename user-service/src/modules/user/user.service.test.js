// eslint-disable-next-line import/no-extraneous-dependencies
import {
  jest, describe, it, expect, beforeEach,
} from '@jest/globals';
import prisma from '../prisma/prisma.service.js';
import service from './user.service.js';
import UserDto from './dto/user.dto.js';

jest.mock('../prisma/prisma.service.js');

describe('UserService', () => {
  const createSpy = jest.spyOn(prisma.user, 'create');
  const updateSpy = jest.spyOn(prisma.user, 'update');
  const findManySpy = jest.spyOn(prisma.user, 'findMany');
  const userDto = {
    username: 'user',
    email: 'test@test.com',
    password: 'asdfasdf',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create user', async () => {
      const createdUser = {
        ...userDto, id: 1, createdAt: '', updatedAt: '',
      };

      createSpy.mockResolvedValueOnce(createdUser);
      const user = await service.create(userDto);
      expect(createSpy).toHaveBeenCalled();
      expect(user).toEqual(new UserDto(createdUser));
    });
  });

  describe('update', () => {
    it('should update user', async () => {
      const updatedUser = {
        ...userDto, id: 1, createdAt: '', updatedAt: '',
      };

      updateSpy.mockResolvedValueOnce(updatedUser);
      const user = await service.update(1, userDto);
      expect(updateSpy).toHaveBeenCalled();
      expect(user).toEqual(new UserDto(updatedUser));
    });
  });

  describe('getAll', () => {
    it('should get all users', async () => {
      const userInDb = {
        ...userDto, id: 1, createdAt: '', updatedAt: '',
      };

      const allUsers = [userInDb, userInDb];
      const allUsersResponse = allUsers.map((user) => new UserDto(user));

      findManySpy.mockResolvedValueOnce(allUsers);

      const users = await service.getAll();

      expect(findManySpy).toHaveBeenCalled();
      expect(users).toHaveLength(allUsers.length);
      expect(users).toEqual(allUsersResponse);
    });
  });
});
