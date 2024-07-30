import { readFile } from 'fs/promises';

import { PROMPT_PATHS, type PromptType } from '@/constants/prompts';

export const getPrompt = async (promptType: PromptType): Promise<string> => {
  const path = PROMPT_PATHS[promptType];
  const rawContent = await readFile(path);

  return rawContent.toString();
};
