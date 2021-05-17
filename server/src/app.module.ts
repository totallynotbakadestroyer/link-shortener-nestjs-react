import { Module } from '@nestjs/common';
import { LinksModule } from './links/links.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { AuthController } from './auth/auth.controller';
import { ShortenedLinksModule } from './shortened-links/shortened-links.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
      serveRoot: '/',
      exclude: ['/api*', '/r*'],
    }),
  ],
  controllers: [UsersController, AuthController],
})
export class AppModule {}
