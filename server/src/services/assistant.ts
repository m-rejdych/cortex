import { matchIntention, matchSource, matchAction } from '@/util/assistant';
import { matchCompletionContent, getChatCompletion } from '@/util/openai';
import { getPrompt } from '@/util/prompts';
import { saveNote, getNotesBySimilarity } from '@/services/notes';
import { INTENTIONS, SOURCES, ACTIONS } from '@/constants/assistant';
import { StatusError } from '@/models';
import type { Intention, Source, Action } from '@/types/assistant';

type SourceContextData<T extends Source> = T extends typeof SOURCES.NOTES
  ? ReturnType<typeof getNotesBySimilarity>
  : T extends typeof SOURCES.UNKNOWN
    ? null
    : never;

const selectSource = matchCompletionContent('SOURCE_SELECTION_SYSTEM', matchSource);

const selectAction = matchCompletionContent('ACTION_SELECTION_SYSTEM', matchAction);

const classifyIntention = matchCompletionContent('INTENTION_CLASSIFICATION_SYSTEM', matchIntention);

const getQueryResponse = async (input: string, context?: string): Promise<string> => {
  const messages: Parameters<typeof getChatCompletion>[0] = [];
  if (context) messages.push({ role: 'system', content: context });
  messages.push({ role: 'user', content: input });

  return getChatCompletion(messages);
};

const getActionResponse = async (action: Action): Promise<string> => {
  // TODO: Prepare prompt
  const prompt = await getPrompt('ACTION_SUCCESS_USER');

  const messageContent = `${prompt}${action}`;
  const completion = await getChatCompletion([{ role: 'user', content: messageContent }]);

  return completion;
};

const getSourceContextData = async <T extends Source>(
  input: string,
  source: T,
): Promise<SourceContextData<T>> => {
  switch (source) {
    case SOURCES.NOTES:
      return getNotesBySimilarity(input) as SourceContextData<T>;
    case SOURCES.UNKNOWN:
      return null as SourceContextData<T>;
    default:
      throw new StatusError('Invalid source');
  }
};

const buildContext = (header: string, contextData: string[]): string => `CONTEXT

### ${header}
${contextData.map((element) => `- ${element}`).join('\n')}`;

const runAction = async (action: Action, input: string): Promise<void> => {
  switch (action) {
    case ACTIONS.SAVE_NOTE:
      await saveNote(input);
      break;
    default:
      break;
  }
};

// TODO: updated return type after function is finished
export const assistantService = async (
  input: string,
): Promise<Intention | Source | Action | string> => {
  const intention = await classifyIntention(input);

  switch (intention) {
    case INTENTIONS.QUERY:
      const source = await selectSource(input);
      const sourceContextData = await getSourceContextData(input, source);
      const context = sourceContextData
        ? buildContext(
            'NOTES',
            sourceContextData.map(({ content }) => content),
          )
        : undefined;

      return getQueryResponse(input, context);
    case INTENTIONS.ACTION:
      const action = await selectAction(input);
      await runAction(action, input);
      return getActionResponse(action);
    default:
      break;
  }

  return intention;
};
