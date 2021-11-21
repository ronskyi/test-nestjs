import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ConfigService } from '@nestjs/config';

export const typeOrmFactory: (
  configService: ConfigService,
) => PostgresConnectionOptions = function (configService) {
  return {
    type: 'postgres',
    url: configService.get<string>('DATABASE_DSN'),
    autoLoadEntities: true,
  };
};
