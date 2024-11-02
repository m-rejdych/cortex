import pgvector from 'pgvector';
import { v4 as uuid } from 'uuid';
import type { Memory } from '@prisma/client';

import { prisma } from '@/sdks/prisma';
import { matchExtractedTagsContent } from '@/util/extractedContentTags';
import { matchCompletionContent, getTextEmbedding } from '@/util/openai';
import { getEntriesBySimilarity } from '@/util/similarity';

const extractMemory = matchCompletionContent('MEMORY_EXTRACTION_SYSTEM', matchExtractedTagsContent);

export const saveMemory = async (input: string): Promise<void> => {
  const extractedMemory = await extractMemory(input);

  const embedding = await getTextEmbedding(
    `${extractedMemory.content} ${extractedMemory.tags.join(' ')}`,
  );
  const sqlEmbedding = pgvector.toSql(embedding);

  const memoryId = uuid();
  await prisma.$executeRaw`INSERT INTO "Memory" (id, embedding, content) VALUES (${memoryId}, ${sqlEmbedding}::vector, ${extractedMemory.content})`;

  const tags = await Promise.all(
    extractedMemory.tags.map((value) =>
      prisma.tag.upsert({
        where: { value: value.toLowerCase() },
        update: {},
        create: { value: value.toLowerCase() },
        select: { id: true },
      }),
    ),
  );

  await prisma.tagOnMemories.createMany({
    data: tags.map(({ id: tagId }) => ({ memoryId, tagId })),
  });
};

export const getMemoriesContentBySimilarity = async (input: string): Promise<string[]> => {
  const memories = await getEntriesBySimilarity<Memory>(input, {
    fields: ['id', 'content'],
    tableName: 'Memory',
  });
  console.log(memories);

  return memories.map(({ content }) => content);
};
