import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
var cookieSession = require('cookie-session');
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

function sweggerConfig(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Calculator API')
    .setDescription('The Calculator API description')
    .setVersion('1.0')
    .addTag('calculator')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

function cookieConfig(app: INestApplication) {
  app.use(
    cookieSession({
      keys: ['portfolio'],
    }),
  );
}

function validationConfig(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe());
}

async function bootstrap() {
  const port = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, { cors: true });

  sweggerConfig(app);
  cookieConfig(app);
  validationConfig(app);

  await app.listen(port);
}

bootstrap();
