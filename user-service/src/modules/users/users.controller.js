import prisma from '../prisma/prisma.service.js';

const getAll = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

const update = (req, res) => {
  res.json(null);
};

const create = (req, res, next) => {
  next();
};

export {
  getAll,
  update,
  create,
};
