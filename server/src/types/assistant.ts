import type { INTENTIONS } from '@/constants/assistant';

export type Intention = typeof INTENTIONS[keyof typeof INTENTIONS];
