import { PERSISTENCE } from '@/infra/persistence/persistence.module';

import { getPersistence, isDeployment } from './utils';

describe(`Testes para as funções`, () => {
  describe(`getPersistence`, () => {
    it(`Deve retornar PERSISTENCE.MEMORY quando o processo PERSISTENCE é %{PERSISTENCE.MEMORY}`, () => {
      process.env.PERSISTENCE = PERSISTENCE.MEMORY;
      const resultado = getPersistence();
      expect(resultado).toBe(PERSISTENCE.MEMORY);
    });

    it(`Deve retornar ${PERSISTENCE.MONGO} quando o processo PERSISTENCE não está definido`, () => {
      delete process.env.PERSISTENCE;
      const resultado = getPersistence();
      expect(resultado).toBe(PERSISTENCE.MONGO);
    });
  });

  describe(`isDeployment`, () => {
    it(`Deve retornar true quando NODE_ENV é "production"`, () => {
      process.env.NODE_ENV = `production`;
      const resultado = isDeployment();
      expect(resultado).toBe(true);
    });

    it(`Deve retornar false quando NODE_ENV não é "production"`, () => {
      process.env.NODE_ENV = `development`; // ou qualquer outro valor diferente de "production"
      const resultado = isDeployment();
      expect(resultado).toBe(false);
    });
  });
});
