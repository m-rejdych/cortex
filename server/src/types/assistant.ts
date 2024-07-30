import type { INTENTIONS } from '@/constants/assistant';

export type Intention = typeof INTENTIONS[keyof typeof INTENTIONS];

export interface IntentionObj {
  intention: Intention;
}
