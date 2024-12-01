import { z } from 'zod';

export const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    QUOTE_API_URL: z.string().url(),
});

export type Env = z.infer<typeof envSchema>;