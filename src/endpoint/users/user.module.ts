import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import Entity from '../../entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import Query from './query';
import Command from './command';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature(Entity)],
  controllers: [UserController],
  providers: [UserService, ...Query, ...Command],
  exports: [UserService],
})
export class UserModule {}
