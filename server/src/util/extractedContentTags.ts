import { extractJsonObj } from '@/util/prompts';
import type { ExtractedContentTags } from '@/types/extractedContentTags';

const isExtractedTagsContent = (value: unknown): value is ExtractedContentTags => {
  if (typeof value !== 'object') return false;
  if (value === null) return false;
  if (!('content' in value)) return false;
  if (typeof value.content !== 'string') return false;
  if (!('tags' in value)) return false;
  if (!Array.isArray(value.tags)) return false;
  if (!value.tags.every((item) => typeof item === 'string')) return false;
  return true;
};

export const matchExtractedTagsContent = (str: string): ExtractedContentTags | null => {
  const jsonObj = extractJsonObj(str);
  if (!jsonObj) return null;
  if (!isExtractedTagsContent(jsonObj)) return null;

  return jsonObj;
}
