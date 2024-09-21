import { isHttpError } from 'http-errors';
import { MongooseError } from 'mongoose';

export const errorHandler = (err, req, res, next) => {
  if (isHttpError(err)) {
    return res.status(err.status).json({
      message: err.name,
      error: err.message,
    });
  }

  if (err instanceof MongooseError) {
    return res.status(500).json({
      status: 500,
      message: 'MongooseError',
      error: err.message,
    });
  }
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};
