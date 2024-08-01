import { openai } from '@/sdks';

import { matchIntention, matchSource, matchAction, type Matcher } from '@/util/assistant';
import { getFirstChatCompletionOrThrow } from '@/util/openai';
import { getPrompt } from '@/util/prompts';
import { StatusError } from '@/models';
import type { Intention, Source, Action } from '@/types/assistant';
import type { PromptType } from '@/constants/prompts';

const matchCompletionContent =
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
      throw new StatusError('Intention not recoqnised.', 400);
    }

    const match = matcher(completionContent);
    if (!match) {
      throw new StatusError('Intention not recoqnised.', 400);
    }

    return match;
  };

const selectSource = matchCompletionContent('SOURCE_SELECTION_SYSTEM', matchSource);

const selectAction = matchCompletionContent('ACTION_SELECTION_SYSTEM', matchAction);

const classifyIntention = matchCompletionContent('INTENTION_CLASSIFICATION_SYSTEM', matchIntention);

export const assistantService = async (input: string): Promise<Intention | Source | Action> => {
  const intention = await classifyIntention(input);

  switch (intention) {
    case 'query':
      return selectSource(input);
    case 'action':
      return selectAction(input);
    default:
      break;
  }

  return intention;
};
