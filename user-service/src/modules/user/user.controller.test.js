// eslint-disable-next-line import/no-extraneous-dependencies
import {
  jest, describe, it, expect, beforeEach,
} from '@jest/globals';
import { StatusCodes } from 'http-status-codes';
import service from './user.service.js';
import controller from './user.controller.js';
import CreateUserDto from './dto/create-user.dto.js';
import UserDto from './dto/user.dto.js';
import UpdateUserDto from './dto/update-user.dto.js';

jest.mock('express-validator');
jest.mock('./user.service.js');

const validator = await import('express-validator');

describe('UserController', () => {
  const userData = {
    username: 'user',
    email: 'test@test.com',
    password: 'asdfasdf',
  };
  const requestMock = {
    params: {
      id: 1,
    },
    body: { ...userData },
  };
  const responseMock = {
    json: jest.fn(),
    status: jest.fn(),
  };
  const nextMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defind', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should call getAll service and return users', async () => {
      const allUsers = [new UserDto(userData)];
      const getAllSpy = jest.spyOn(service, 'getAll').mockResolvedValueOnce(allUsers);
      await controller.getAll(requestMock, responseMock, nextMock);
      expect(getAllSpy).toHaveBeenCalled();
      expect(responseMock.json).toHaveBeenCalledWith(allUsers);
      expect(responseMock.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(nextMock).not.toHaveBeenCalled();
    });

    it('should call next() on any error', async () => {
      jest.spyOn(service, 'getAll').mockRejectedValueOnce('error');
      await controller.getAll(requestMock, responseMock, nextMock);
      expect(nextMock).toHaveBeenCalledWith('error');
    });
  });

  describe('create', () => {
    const createdUser = new UserDto(userData);
    const createUserDto = new CreateUserDto(userData);

    it('should call create service and return user', async () => {
      const createSpy = jest.spyOn(service, 'create').mockResolvedValueOnce(createdUser);
      await controller.create(requestMock, responseMock, nextMock);
      expect(createSpy).toHaveBeenCalledWith(createUserDto);
      expect(responseMock.json).toHaveBeenCalledWith(createdUser);
      expect(responseMock.status).toHaveBeenCalledWith(StatusCodes.CREATED);
      expect(nextMock).not.toHaveBeenCalled();
    });

    it('should call next() on validation errors', async () => {
      jest.spyOn(validator, 'validationResult').mockReturnValueOnce({
        isEmpty: jest.fn(() => false),
      });

      await controller.create(requestMock, responseMock, nextMock);
      expect(responseMock.json).not.toHaveBeenCalled();
      expect(responseMock.status).not.toHaveBeenCalled();
      expect(nextMock).toHaveBeenCalled();
    });

    it('should call next() on any error', async () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce('error');
      await controller.create(requestMock, responseMock, nextMock);
      expect(responseMock.json).not.toHaveBeenCalled();
      expect(responseMock.status).not.toHaveBeenCalled();
      expect(nextMock).toHaveBeenCalledWith('error');
    });
  });

  describe('update', () => {
    const updatedUser = new UserDto(userData);
    const updateUserDto = new UpdateUserDto(userData);

    it('should call update service and return user', async () => {
      const updateSpy = jest.spyOn(service, 'update').mockResolvedValueOnce(updatedUser);
      await controller.update(requestMock, responseMock, nextMock);
      expect(updateSpy).toHaveBeenCalledWith(requestMock.params.id, updateUserDto);
      expect(responseMock.json).toHaveBeenCalledWith(updatedUser);
      expect(responseMock.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(nextMock).not.toHaveBeenCalled();
    });

    it('should call next() on validation errors', async () => {
      jest.spyOn(validator, 'validationResult').mockReturnValueOnce({
        isEmpty: jest.fn(() => false),
      });

      await controller.update(requestMock, responseMock, nextMock);
      expect(responseMock.json).not.toHaveBeenCalled();
      expect(responseMock.status).not.toHaveBeenCalled();
      expect(nextMock).toHaveBeenCalled();
    });

    it('should call next() on any error', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce('error');
      await controller.update(requestMock, responseMock, nextMock);
      expect(responseMock.json).not.toHaveBeenCalled();
      expect(responseMock.status).not.toHaveBeenCalled();
      expect(nextMock).toHaveBeenCalledWith('error');
    });
  });
});
