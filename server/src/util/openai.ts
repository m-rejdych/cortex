import type OpenAI from 'openai';

import { StatusError } from '@/models';
import { openai } from '@/sdks';

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

export const getTextEmbedding = async (input: string): Promise<number[] | null> => {
  const response = await openai.embeddings.create({ input, model: 'text-embedding-3-small' });
  const [embeddingItem] = response.data;
  if (!embeddingItem) return null;

  return embeddingItem.embedding;
}
