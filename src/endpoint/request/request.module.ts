import Querys from './query';
import Commands from './command';
import Entity from '../../entity';
import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature(Entity), AuthModule, UserModule],
  controllers: [RequestController],
  providers: [RequestService, ...Querys, ...Commands],
  exports: [RequestService],
})
export class RequestModule {}
