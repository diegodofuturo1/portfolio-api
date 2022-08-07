import { Repository } from 'typeorm';
import { Param } from 'src/entity/request/param.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class ReadParamQuery implements IQuery {
  constructor(public userId: string) {}
}

@QueryHandler(ReadParamQuery)
export class ReadParamQueryHandler implements IQueryHandler<ReadParamQuery> {
  constructor(
    @InjectRepository(Param)
    private readonly repository: Repository<Param>,
  ) {}

  async execute(query: ReadParamQuery): Promise<any> {
    const { userId } = query;

    const param = await this.repository.find({ userId });

    if (!param) throw new NotFoundException('Parâmetro não encontrado');

    return param;
  }
}
