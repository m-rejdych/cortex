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

export const isSoucre = (value: unknown): value is Source =>
  Object.values(SOURCES).includes(value as Source);

export const isAction = (value: unknown): value is Action =>
  Object.values(ACTIONS).includes(value as Action);

const createStrMatcher =
  <T>(regexp: RegExp, isMatchValidator: IsMatchValidator<T>): Matcher<T> =>
  (str) => {
    const matches = str.match(regexp);
    if (!matches) return null;

    const [match] = matches;
    if (!isMatchValidator(match)) return null;

    return match;
  };

export const matchIntention = createStrMatcher(intentionRegexp, isIntention);

export const matchSource = createStrMatcher(queryRegexp, isSoucre);

export const matchAction = createStrMatcher(actionRegexp, isAction);
