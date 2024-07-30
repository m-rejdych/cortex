import type OpenAI from 'openai';

import { StatusError } from '@/models';
import { INTENTIONS } from '@/constants/assistant';
import type { IntentionObj, Intention } from '@/types/assistant';

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

const isIntention = (intention: unknown): intention is Intention =>
  Object.values(INTENTIONS).includes(intention as Intention);

export const isIntentionObj = (jsonObj: unknown): jsonObj is IntentionObj =>
  typeof jsonObj === 'object' &&
  jsonObj !== null &&
  'intention' in jsonObj &&
  isIntention(jsonObj.intention);
