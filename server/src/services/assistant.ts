import { openai } from '@/sdks';

import { matchIntention } from '@/util/assistant';
import { getFirstChatCompletionChoiceContentOrThrow } from '@/util/openai';
import { getPrompt } from '@/util/prompts';
import { StatusError } from '@/models';
import type { Intention } from '@/types/assistant';

export const assistantService = async (input: string): Promise<Intention> => {
  const systemMessage = await getPrompt('CLASSIFICATION_SYSTEM');

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.3,
    messages: [
      { role: 'system', content: systemMessage },
      { role: 'user', content: input },
    ],
  });

  const completionContent = getFirstChatCompletionChoiceContentOrThrow(response);
  if (!completionContent) {
    throw new StatusError('Intention not recoqnised.', 400);
  }

  const intention = matchIntention(completionContent);
  if (!intention) {
    throw new StatusError('Intention not recoqnised.', 400);
  }

  return intention;
};
