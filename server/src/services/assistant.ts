import { openai } from '@/sdks';

import { getFirstChatCompletionChoiceContentOrThrow, isIntentionObj } from '@/util/assistant';
import { getPrompt, extractJsonObj } from '@/util/prompts';
import type { JsonObj } from '@/types/http';

export const assistantService = async (input: string): Promise<JsonObj | null> => {
  const systemMessage = await getPrompt('INTENTION_SYSTEM');

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.3,
    messages: [
      { role: 'system', content: systemMessage },
      { role: 'user', content: input },
    ],
  });

  const completionContent = getFirstChatCompletionChoiceContentOrThrow(response);
  const jsonObj = completionContent ? extractJsonObj(completionContent) : null;

  return isIntentionObj(jsonObj) ? jsonObj : null;
};
