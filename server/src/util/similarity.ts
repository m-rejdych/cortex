import pgvector from 'pgvector';

import { getTextEmbedding } from '@/util/openai';
import { prisma } from '@/sdks/prisma';

export type WithSimilarityScore<T extends object> = T & {
  score: number;
};

interface GetEntriesBySimilarityDbArgs {
  tableName: string;
  fields: string[];
  limit?: number;
}

export const getEntriesBySimilarity = async <T extends object>(
  input: string,
  { tableName, fields, limit = 5 }: GetEntriesBySimilarityDbArgs,
): Promise<WithSimilarityScore<T>[]> => {
  const embedding = await getTextEmbedding(input);
  const sqlEmbedding = pgvector.toSql(embedding);

  const entries: WithSimilarityScore<T>[] = await prisma.$queryRawUnsafe(
    `SELECT ${fields.join(', ')}, embedding <-> $1::vector AS score FROM "${tableName}" ORDER BY score LIMIT ${limit}`,
    sqlEmbedding,
  );
  const avg = entries.reduce((acc, { score }) => acc + score, 0) / entries.length;

  return entries.filter(({ score }) => score < parseFloat(avg.toFixed(3)));
};
