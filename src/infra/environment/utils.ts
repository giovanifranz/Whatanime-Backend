import { z } from 'nestjs-zod/z';

import { PERSISTENCE } from '@/infra/persistence/persistence.module';

export function getPersistence() {
  if (process.env.PERSISTENCE === PERSISTENCE.MEMORY) return PERSISTENCE.MEMORY;
  return PERSISTENCE.MONGO;
}

export function isDeployment() {
  return process.env.NODE_ENV === 'production';
}

export const envSchema = z.object({
  ENV_TYPE: z.enum(['dev', 'prd', 'test']).default('dev'),
  PORT: z.coerce.number().optional().default(5000),
  PERSISTENCE: z.enum(['MONGO', 'MEMORY']).optional().default('MONGO'),
  MONGODB_URI: z.string().url(),
});

export type Env = z.output<typeof envSchema>;
