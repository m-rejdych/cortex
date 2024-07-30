import type { RequestHandler as ExpressRequestHandler } from 'express';

interface ResultResponse<T> {
  result: 'success' | 'failure';
  data: T;
}

export type RequestHandler<
  ResBody,
  ReqBody = never,
  Query = Record<string, never>,
  Params = Record<string, never>,
> = ExpressRequestHandler<Params, ResultResponse<ResBody>, ReqBody, Query>;

export type JsonObj = Record<string, unknown>;
