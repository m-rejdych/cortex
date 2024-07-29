import OpenAI from 'openai';
import { config } from 'dotenv';

config();

export const openai = global.openai ?? new OpenAI();

if (process.env.NODE_ENV === 'development' && !global.openai) {
  global.openai = openai;
}
