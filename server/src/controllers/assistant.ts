import type { RequestHandler } from '@/types/http';

import { assistantService } from '@/services/assistant';
import type { JsonObj } from '@/types/http';

interface InputPayload {
  input: string;
}

export const assistantController: RequestHandler<JsonObj | null, InputPayload> = async (
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
