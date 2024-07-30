import { readFile } from 'fs/promises';

import { PROMPT_PATHS, type PromptType } from '@/constants/prompts';
import type { JsonObj } from '@/types/http';

export const getPrompt = async (promptType: PromptType): Promise<string> => {
  const path = PROMPT_PATHS[promptType];
  const rawContent = await readFile(path);

  return rawContent.toString();
};

export const extractJsonObj = (str: string): JsonObj | null => {
  const firstBracketIdx = str.indexOf('{');
  const lastBracketIdx = str.lastIndexOf('}');
  if ([firstBracketIdx, lastBracketIdx].includes(-1)) return null;

  const jsonStr = str.slice(firstBracketIdx, lastBracketIdx + 1);

  return (() => {
    try {
      return JSON.parse(jsonStr);
    } catch {
      return null;
    }
  })();
};

