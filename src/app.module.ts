import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
/*import { SecurityModule } from './security/security.module';*/

import { PrismaModule } from './prisma/prisma.module';
import { PermissionModule } from './permission/permission.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';
import { TypeAdministrationModule } from './type-administration/type-administration.module';
import { ContactService } from './contact/contact.service';
import { ContactController } from './contact/contact.controller';
import { ContactModule } from './contact/contact.module';
import { ServiceService } from './service/service.service';
import { ServiceModule } from './service/service.module';
import { VilleModule } from './ville/ville.module';
import { ContactTypeModule } from './contact-type/contact-type.module';
import { AdministrationModule } from './administration/administration.module';
import { HoraireModule } from './horaire/horaire.module';
import { AdministrationImageController } from './administration-image/administration-image.controller';
import { AdministrationImageService } from './administration-image/administration-image.service';
import { AdministrationImageModule } from './administration-image/administration-image.module';
import { UploadController } from './upload/upload.controller';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [ PrismaModule, PermissionModule,RoleModule, AuthModule, 
    ConfigModule.forRoot({isGlobal: true}), UsersModule, TypeAdministrationModule, ContactModule, ServiceModule, VilleModule, ContactTypeModule, AdministrationModule, HoraireModule, AdministrationImageModule, UploadModule
  ],
  controllers: [AppController, ContactController, AdministrationImageController, UploadController],
  providers: [AppService, ContactService, ServiceService, AdministrationImageService],
})
export class AppModule {}


