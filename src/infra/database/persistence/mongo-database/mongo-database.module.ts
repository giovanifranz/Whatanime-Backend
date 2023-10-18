import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { EnvironmentModule } from '@/infra/environment/environment.module';
import { EnvironmentService } from '@/infra/environment/environment.service';

const CONNECTION = MongooseModule.forRootAsync({
  imports: [EnvironmentModule],
  useFactory: (env: EnvironmentService) => {
    return {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      uri: env.get('MONGODB_URI'),
    };
  },
  inject: [ConfigService],
});

@Module({
  imports: [CONNECTION],
  exports: [CONNECTION],
})
export class MongoDatabaseModule {}
