import { extractJsonObj } from '@/util/prompts';
import type { ExtractedNote } from '@/types/notes';

const isExtractedNote = (value: unknown): value is ExtractedNote => {
  if (typeof value !== 'object') return false;
  if (value === null) return false;
  if (!('content' in value)) return false;
  if (typeof value.content !== 'string') return false;
  if (!('tags' in value)) return false;
  if (!Array.isArray(value.tags)) return false;
  if (!value.tags.every((item) => typeof item === 'string')) return false;
  return true;
};

export const matchExtractedNote = (str: string): ExtractedNote | null => {
  const jsonObj = extractJsonObj(str);
  if (!jsonObj) return null;
  if (!isExtractedNote(jsonObj)) return null;

  return jsonObj;
}
