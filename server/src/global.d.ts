import type OpenAI from 'openai';

declare global {
  var openai: OpenAI | undefined;

  namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV?: 'development' | 'production';
      HOST?: string;
      PORT?: string;
    }
  }
}
