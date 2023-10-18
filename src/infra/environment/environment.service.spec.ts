import { TestingModule } from '@nestjs/testing';
import { createTestingModule } from '@test/utils/test-utils';

import { EnvironmentModule } from './environment.module';
import { EnvironmentService } from './environment.service';

describe('EnvironmentService', () => {
  let environmentService: EnvironmentService;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule({
      imports: [EnvironmentModule],
      providers: [EnvironmentService],
    }).compile();

    environmentService = module.get<EnvironmentService>(EnvironmentService);
  });

  it('Should be defined', () => {
    expect(environmentService).toBeDefined();
  });

  it('Should return the value from ConfigService', () => {
    const result = environmentService.get('ENV_TYPE');
    expect(result).toBe('test');
  });
});
