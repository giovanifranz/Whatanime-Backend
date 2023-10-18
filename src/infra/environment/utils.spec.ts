import { PERSISTENCE } from '@/infra/persistence/persistence.module';

import { getPersistence, isDeployment } from './utils';

describe(`Tests for the functions`, () => {
  describe(`getPersistence`, () => {
    it(`Should return PERSISTENCE.MEMORY when the PERSISTENCE environment variable is set to ${PERSISTENCE.MEMORY}`, () => {
      process.env.PERSISTENCE = PERSISTENCE.MEMORY;
      const result = getPersistence();
      expect(result).toBe(PERSISTENCE.MEMORY);
    });

    it(`Should return ${PERSISTENCE.MONGO} when the PERSISTENCE environment variable is not defined`, () => {
      delete process.env.PERSISTENCE;
      const result = getPersistence();
      expect(result).toBe(PERSISTENCE.MONGO);
    });
  });

  describe(`isDeployment`, () => {
    it(`Should return true when NODE_ENV is "production"`, () => {
      process.env.NODE_ENV = `production`;
      const result = isDeployment();
      expect(result).toBe(true);
    });

    it(`Should return false when NODE_ENV is not "production"`, () => {
      process.env.NODE_ENV = `development`; // or any other value different from "production"
      const result = isDeployment();
      expect(result).toBe(false);
    });
  });
});
