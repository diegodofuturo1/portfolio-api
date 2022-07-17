import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/user.module';
import { CurrentUserInterceptor } from 'src/interceptor/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

const GlobalCurrentUserInterceptor = {
  provide: APP_INTERCEPTOR,
  useClass: CurrentUserInterceptor,
};

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, GlobalCurrentUserInterceptor],
  exports: [AuthService],
})
export class AuthModule {}
