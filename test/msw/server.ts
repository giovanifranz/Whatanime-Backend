import { setupServer } from 'msw/node';

import { handlers } from './handlers';

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen({
    onUnhandledRequest: vi.fn(),
  });
});

afterAll(() => server.close());
