import path from 'path';

const PROMPTS_DIR_PATH = path.join(process.cwd(), 'prompts');

export const PROMPT_PATHS = {
  INTENTION_SYSTEM: path.join(PROMPTS_DIR_PATH, 'intention-system.md'),
} as const;

export type PromptType = keyof typeof PROMPT_PATHS;
