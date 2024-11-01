import pgvector from 'pgvector';
import { v4 as uuid } from 'uuid';
import type { Note } from '@prisma/client';

import { matchCompletionContent, getTextEmbedding } from '@/util/openai';
import { matchExtractedNote } from '@/util/notes';
import { prisma } from '@/sdks/prisma';

interface NoteWithSimilarityScore extends Note {
  score: number;
}

const extractNote = matchCompletionContent('NOTE_EXTRACTION_SYSTEM', matchExtractedNote);

export const saveNote = async (input: string): Promise<void> => {
  const extractedNote = await extractNote(input);

  const embedding = await getTextEmbedding(
    `${extractedNote.content} ${extractedNote.tags.join(' ')}`,
  );
  const sqlEmbedding = pgvector.toSql(embedding);

  const noteId = uuid();
  await prisma.$executeRaw`INSERT INTO public."Note" (id, embedding, content) VALUES (${noteId}, ${sqlEmbedding}::vector, ${extractedNote.content})`;

  const tags = await Promise.all(
    extractedNote.tags.map(async (value) =>
      prisma.tag.upsert({
        where: { value: value.toLowerCase() },
        create: { value: value.toLowerCase() },
        update: {},
        select: { id: true },
      }),
    ),
  );

  // TODO: Check if "tags" contains all desired tags, or just created ones.
  await prisma.tagOnNotes.createMany({ data: tags.map(({ id: tagId }) => ({ tagId, noteId })) });
};

export const getNotesBySimilarity = async (
  input: string,
  limit = 5,
): Promise<NoteWithSimilarityScore[]> => {
  const embedding = await getTextEmbedding(input);
  const sqlEmbedding = pgvector.toSql(embedding);

  const notes: NoteWithSimilarityScore[] =
    await prisma.$queryRaw`SELECT id, content, embedding <-> ${sqlEmbedding}::vector AS score FROM public."Note" ORDER BY score LIMIT ${limit}`;
  const average = notes.reduce((acc, { score }) => acc + score, 0) / notes.length;

  return notes.filter(({ score }) => score < parseFloat(average.toFixed(3)));
};
