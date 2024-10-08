import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};

export const isValidUserId = (req, res, next) => {
  const { userId } = req.body;
  if (!isValidObjectId(userId)) {
    return next(createHttpError(400, 'Invalid user ID format'));
  }

  next();
};
