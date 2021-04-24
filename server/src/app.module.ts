import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinksModule } from './links/links.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { AuthController } from './auth/auth.controller';
import { ShortenedLinksModule } from './shortened-links/shortened-links.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoUri'),
        useCreateIndex: true,
      }),
      inject: [ConfigService],
    }),
    LinksModule,
    UsersModule,
    AuthModule,
    ShortenedLinksModule,
  ],
  controllers: [AppController, UsersController, AuthController],
  providers: [AppService],
})
export class AppModule {}