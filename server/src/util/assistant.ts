import { INTENTIONS, SOURCES, ACTIONS } from '@/constants/assistant';
import type { Intention, Source, Action } from '@/types/assistant';

const intentionRegexp = /(action|query)/;
const queryRegexp = /(notes|memories|obsidian|calendar|todos|links|unknown)/;
const actionRegexp =
  /(saveNote|saveMemory|saveLink|saveCalendarEvent|saveObsidianNote|saveTodo|unknown)/;

type IsMatchValidator<T> = (value: unknown) => value is T;

export type Matcher<T> = (str: string) => T | null;

const isIntention = (intention: unknown): intention is Intention =>
  Object.values(INTENTIONS).includes(intention as Intention);

export const isSoucre = (query: unknown): query is Source =>
  Object.values(SOURCES).includes(query as Source);

export const isAction = (query: unknown): query is Action =>
  Object.values(ACTIONS).includes(query as Action);

const createMatcher =
  <T>(regexp: RegExp, isMatchValidator: IsMatchValidator<T>): Matcher<T> =>
  (str) => {
    const matches = str.match(regexp);
    if (!matches) return null;

    const [match] = matches;
    if (!isMatchValidator(match)) return null;

    return match;
  };

export const matchIntention = createMatcher(intentionRegexp, isIntention);

export const matchSource = createMatcher(queryRegexp, isSoucre);

export const matchAction = createMatcher(actionRegexp, isAction);
