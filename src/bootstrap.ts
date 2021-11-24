import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotFoundErrorFilter } from './resources/filters/not-fount-error.filter';
import { ConflictErrorFilter } from './resources/filters/conflict-error.filter';
export async function bootstrap(app: INestApplication): Promise<void> {
  app.useLogger(['log', 'warn', 'error']);

  const configService = app.get(ConfigService);
  app.enableCors({ origin: configService.get('FRONTEND_DOMAIN') });

  app.useGlobalFilters(new NotFoundErrorFilter());
  app.useGlobalFilters(new ConflictErrorFilter());
  await app.listen(3000);
}
