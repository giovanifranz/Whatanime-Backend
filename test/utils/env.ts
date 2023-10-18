import { PERSISTENCE } from '@/infra/database/persistence/persistence.module';

process.env.ENV_TYPE = 'test';
process.env.PERSISTENCE = PERSISTENCE.MEMORY;
