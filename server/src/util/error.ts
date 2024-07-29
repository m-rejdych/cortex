import type { Request, Response, NextFunction } from 'express';

import type { StatusError } from '@/models';

export const genericErrorHandler = (
  error: StatusError,
  _: Request,
  res: Response,
  __: NextFunction,
) => {
  console.log('ERROR', error);

  res.json({ message: error.message, status: error.status });
};
