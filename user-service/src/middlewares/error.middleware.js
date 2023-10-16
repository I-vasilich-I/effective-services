import { StatusCodes } from 'http-status-codes';
import { Prisma } from '@prisma/client';

const PRISMA_ERROR_CODES = {
  UNIQUE_CONSTRAINT: 'P2002',
};

const getPrismaErrorMessage = (error) => error.message.split('\n').pop();

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (error, req, res, next) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === PRISMA_ERROR_CODES.UNIQUE_CONSTRAINT) {
      const message = getPrismaErrorMessage(error);
      return res.status(StatusCodes.CONFLICT).json({ message });
    }

    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message });
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    const message = getPrismaErrorMessage(error);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message });
  }

  // express-validator
  if (Array.isArray(error.errors)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Validation error', errors: error.errors });
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'Internal server error' });
};

export default errorMiddleware;
