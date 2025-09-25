import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import { AppModule } from './app.module';
//import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: 'http://localhost:4200', //autorise seulement angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    Credentials: true
  })

  const config = new DocumentBuilder()
    .setTitle('API sécurisé')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' , name :'Authorization', in: 'header'},'Bearer'
      )
    .addTag('Annuaire') 
    .build();

  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
