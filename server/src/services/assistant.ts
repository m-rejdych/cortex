import { openai } from '@/sdks';

import { StatusError } from '@/models';

export const assistantService = async (input: string): Promise<string | null> => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.5,
    messages: [{ role: 'user', content: input }],
  });

  const [choice] = response.choices;

  if (!choice) throw new StatusError('No choice found.');

  return choice.message.content;
};
