import type { RequestHandler } from '@/types/http';

import { assistantService } from '@/services/assistant';

interface InputPayload {
  input: string;
}

export const assistantController: RequestHandler<string | null, InputPayload> = async (
  req,
  res,
  next,
) => {
  try {
    const result = await assistantService(req.body.input);
    res.json({ result: 'success', data: result });
  } catch (error) {
    next(error);
  }
};
