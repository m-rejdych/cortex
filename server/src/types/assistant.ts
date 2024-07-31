import type { INTENTIONS, SOURCES, ACTIONS } from '@/constants/assistant';

export type Intention = typeof INTENTIONS[keyof typeof INTENTIONS];

export type Source = typeof SOURCES[keyof typeof SOURCES];

export type Action = typeof ACTIONS[keyof typeof ACTIONS];
