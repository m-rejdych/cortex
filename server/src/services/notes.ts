import pgvector from 'pgvector';
import { v4 as uuid } from 'uuid';
import type { Note } from '@prisma/client';

import { matchCompletionContent, getTextEmbedding } from '@/util/openai';
import { matchExtractedTagsContent } from '@/util/extractedContentTags';
import { getEntriesBySimilarity } from '@/util/similarity';
import { prisma } from '@/sdks/prisma';

const extractNote = matchCompletionContent('NOTE_EXTRACTION_SYSTEM', matchExtractedTagsContent);

export const saveNote = async (input: string): Promise<void> => {
  const extractedNote = await extractNote(input);

  const embedding = await getTextEmbedding(
    `${extractedNote.content} ${extractedNote.tags.join(' ')}`,
  );
  const sqlEmbedding = pgvector.toSql(embedding);

  const noteId = uuid();
  await prisma.$executeRaw`INSERT INTO "Note" (id, embedding, content) VALUES (${noteId}, ${sqlEmbedding}::vector, ${extractedNote.content})`;

  const tags = await Promise.all(
    extractedNote.tags.map((value) =>
      prisma.tag.upsert({
        where: { value: value.toLowerCase() },
        create: { value: value.toLowerCase() },
        update: {},
        select: { id: true },
      }),
    ),
  );

  await prisma.tagOnNotes.createMany({ data: tags.map(({ id: tagId }) => ({ tagId, noteId })) });
};

export const getNotesContentBySimilarity = async (input: string): Promise<string[]> => {
  const notes = await getEntriesBySimilarity<Note>(input, {
    fields: ['id', 'content'],
    tableName: 'Note',
  });

  return notes.map(({ content }) => content);
};
