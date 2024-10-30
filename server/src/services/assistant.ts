import { matchIntention, matchSource, matchAction } from '@/util/assistant';
import { matchCompletionContent } from '@/util/openai';
import { saveNote } from '@/services/notes';
import type { Intention, Source, Action } from '@/types/assistant';

const selectSource = matchCompletionContent('SOURCE_SELECTION_SYSTEM', matchSource);

const selectAction = matchCompletionContent('ACTION_SELECTION_SYSTEM', matchAction);

const classifyIntention = matchCompletionContent('INTENTION_CLASSIFICATION_SYSTEM', matchIntention);

const handleAction = async (action: Action, input: string): Promise<void> => {
  switch (action) {
    case 'saveNote':
      await saveNote(input);
      break;
    default:
      break;
  }
};

// TODO: updated return type after function is finished
export const assistantService = async (input: string): Promise<Intention | Source | Action> => {
  const intention = await classifyIntention(input);

  switch (intention) {
    case 'query':
      // TODO: perform source search based on selected source
      return selectSource(input);
    case 'action':
      // TODO: perform action based on selected action
      const action = await selectAction(input);
      handleAction(action, input);
      return action;
    default:
      break;
  }

  return intention;
};
