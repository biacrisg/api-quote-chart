import { z } from 'zod';
export declare const envSchema: z.ZodObject<{
    DATABASE_URL: z.ZodString;
    QUOTE_API_URL: z.ZodString;
}, "strip", z.ZodTypeAny, {
    DATABASE_URL?: string;
    QUOTE_API_URL?: string;
}, {
    DATABASE_URL?: string;
    QUOTE_API_URL?: string;
}>;
export type Env = z.infer<typeof envSchema>;
