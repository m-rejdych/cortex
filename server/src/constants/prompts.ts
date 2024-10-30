import path from 'path';

const PROMPTS_DIR_PATH = path.join(process.cwd(), 'prompts');

export const PROMPT_PATHS = {
  INTENTION_CLASSIFICATION_SYSTEM: path.join(
    PROMPTS_DIR_PATH,
    'intention-classification-system.md',
  ),
  SOURCE_SELECTION_SYSTEM: path.join(PROMPTS_DIR_PATH, 'source-selection-system.md'),
  ACTION_SELECTION_SYSTEM: path.join(PROMPTS_DIR_PATH, 'action-selection-system.md'),
  NOTE_EXTRACTION_SYSTEM: path.join(PROMPTS_DIR_PATH, 'note-extraction-system.md'),
} as const;

export type PromptType = keyof typeof PROMPT_PATHS;
