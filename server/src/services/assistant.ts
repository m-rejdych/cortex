import { openai } from '@/sdks';

import { getFirstChatCompletionChoiceContentOrThrow } from '@/util/assistant';

export const assistantService = async (input: string): Promise<string | null> => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.5,
    messages: [{ role: 'user', content: input }],
  });

  return getFirstChatCompletionChoiceContentOrThrow(response);
};
