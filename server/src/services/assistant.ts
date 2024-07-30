import { openai } from '@/sdks';

import { getFirstChatCompletionChoiceContentOrThrow } from '@/util/assistant';
import { getPrompt } from '@/util/prompts';

export const assistantService = async (input: string): Promise<string | null> => {
  const systemMessage = await getPrompt('INTENTION_SYSTEM');

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.5,
    messages: [
      { role: 'system', content: systemMessage },
      { role: 'user', content: input },
    ],
  });

  return getFirstChatCompletionChoiceContentOrThrow(response);
};
