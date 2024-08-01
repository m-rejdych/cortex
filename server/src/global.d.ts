import type OpenAI from 'openai';
import type { PrismaClient } from '@prisma/client';

declare global {
  var openai: OpenAI | undefined;
  var prisma: PrismaClient | undefined;

  namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV?: 'development' | 'production';
      HOST?: string;
      PORT?: string;
    }
  }
}
