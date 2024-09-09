import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'xingke',
      name: 'xk.session',
      rolling: true,
      cookie: { maxAge: 600000 },
    }),
  );
  await app.listen(3000);
}
bootstrap();
