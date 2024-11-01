import { matchIntention, matchSource, matchAction } from '@/util/assistant';
import { matchCompletionContent, getChatCompletion } from '@/util/openai';
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

// const handleActionResponse = async (context?: string): Promise<string> => {};

const getSourceContextData = async <T extends Source>(source: T): Promise<SourceContextData<T>> => {
  switch (source) {
    case SOURCES.NOTES:
      return getNotesBySimilarity(source) as SourceContextData<T>;
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
      const sourceContextData = await getSourceContextData(source);
      const context = sourceContextData
        ? buildContext(
            'NOTES',
            sourceContextData.map(({ content }) => content),
          )
        : undefined;

      return getQueryResponse(input, context);
    case INTENTIONS.ACTION:
      const action = await selectAction(input);
      runAction(action, input);
      return action;
    default:
      break;
  }

  return intention;
};
