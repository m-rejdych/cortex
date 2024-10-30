import type OpenAI from 'openai';

import { StatusError } from '@/models';
import { openai } from '@/sdks';
import { getPrompt } from '@/util/prompts';
import type { PromptType } from '@/constants/prompts';
import type { Matcher } from '@/util/assistant';

export const getFirstChatCompletionOrThrow = (
  completion: OpenAI.ChatCompletion,
  message = 'Completion choice content could not be extracted.',
): string | null => {
  const [choice] = completion.choices;
  if (!choice?.message.content) {
    throw new StatusError(message);
  }

  return choice.message.content;
};

export const matchCompletionContent =
  <T>(promptType: PromptType, matcher: Matcher<T>) =>
  async (input: string): Promise<T> => {
    const systemMessage = await getPrompt(promptType);

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.3,
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: input },
      ],
    });

    const completionContent = getFirstChatCompletionOrThrow(response);
    if (!completionContent) {
      throw new StatusError('Completion not found', 400);
    }

    const match = matcher(completionContent);
    if (!match) {
      throw new StatusError('Unexpected completion result', 400);
    }

    return match;
  };

export const getTextEmbedding = async (input: string): Promise<number[] | null> => {
  const response = await openai.embeddings.create({ input, model: 'text-embedding-3-small' });
  const [embeddingItem] = response.data;
  if (!embeddingItem) return null;

  return embeddingItem.embedding;
};
