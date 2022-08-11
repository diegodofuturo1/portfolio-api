import 'dotenv/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from '../users/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { CurrentUserInterceptor } from 'src/interceptor/current-user.interceptor';

const GlobalCurrentUserInterceptor = {
  provide: APP_INTERCEPTOR,
  useClass: CurrentUserInterceptor,
};

@Module({
  imports: [
    UserModule,
    JwtModule.register({ secret: process.env.SECRET, signOptions: { expiresIn: `3600s` } }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, GlobalCurrentUserInterceptor],
  exports: [AuthService],
})
export class AuthModule {}
