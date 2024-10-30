import type { RequestHandler } from '@/types/http';

import { assistantService } from '@/services/assistant';
import { StatusError } from '@/models';
import type { Intention, Source, Action } from '@/types/assistant';

interface InputPayload {
  input: string;
}

export const assistantController: RequestHandler<
  Intention | Source | Action,
  InputPayload
> = async (req, res, next) => {
  try {
    const { input } = req.body;
    if (!input) throw new StatusError('"input" is required.', 400);

    const result = await assistantService(req.body.input);
    res.json({ result: 'success', data: result });
  } catch (error) {
    next(error);
  }
};
