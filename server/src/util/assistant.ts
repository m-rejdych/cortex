import { INTENTIONS } from '@/constants/assistant';
import type { Intention } from '@/types/assistant';

const intentionRegexp = /(action|query|other)/;

const isIntention = (intention: unknown): intention is Intention =>
  Object.values(INTENTIONS).includes(intention as Intention);

export const matchIntention = (str: string): Intention | null => {
  const matches = str.match(intentionRegexp);
  if (!matches) return null;

  const [intention] = matches;
  if (!isIntention(intention)) return null;

  return intention;
};

