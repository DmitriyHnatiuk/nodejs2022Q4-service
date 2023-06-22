import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';
import { ExceptionsFilters } from './middleware/error_load';
import { getLogLevel } from './utils/index';

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '0.0.0.0';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getLogLevel(),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const http = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionsFilters(http));
  await app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
  });
}
bootstrap();
