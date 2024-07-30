import type OpenAI from 'openai';

import { StatusError } from '@/models';

export const getFirstChatCompletionChoiceContentOrThrow = (
  completion: OpenAI.ChatCompletion,
  message = 'Completion choice content could not be extracted.',
): string | null => {
  const [choice] = completion.choices;
  if (!choice?.message.content) {
    throw new StatusError(message);
  }

  return choice.message.content;
};
