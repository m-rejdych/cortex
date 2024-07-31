import type { INTENTIONS, SOURCES } from '@/constants/assistant';

export type Intention = typeof INTENTIONS[keyof typeof INTENTIONS];

export type Source = typeof SOURCES[keyof typeof SOURCES];
