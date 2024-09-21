import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { env } from './utils/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import contactRouter from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = env('PORT', 3000);

export const setupServer = () => {
  const app = express();

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Welcome to the Contacts API',
    });
  });

  app.use(express.json());

  app.use(contactRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
