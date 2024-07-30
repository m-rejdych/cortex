import path from 'path';

export const PROMPT_PATHS = {
  INTENTION_SYSTEM: path.join(__dirname, 'intention-system.md'),
}

export type PromptType = keyof typeof PROMPT_PATHS;
