import Querys from './query';
import Commands from './command';
import Entity from '../../entity';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature(Entity)],
  controllers: [PortfolioController],
  providers: [PortfolioService, ...Querys, ...Commands],
  exports: [PortfolioService],
})
export class PortfolioModule {}
