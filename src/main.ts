import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { bootstrap } from './bootstrap';

async function main() {
  const app = await NestFactory.create(AppModule);
  await bootstrap(app);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
