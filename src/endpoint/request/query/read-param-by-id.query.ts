
import { Repository } from 'typeorm';
import { Param } from 'src/entity/request/param.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class ReadParamByIdQuery implements IQuery {
  constructor(public readonly id: string, public userId: string) {}
}

@QueryHandler(ReadParamByIdQuery)
export class ReadParamByIdQueryHandler
  implements IQueryHandler<ReadParamByIdQuery>
{
  constructor(
    @InjectRepository(Param)
    private readonly repository: Repository<Param>,
  ) {}

  async execute(query: ReadParamByIdQuery): Promise<any> {
    const { id, userId } = query;

    if (!id) throw new BadRequestException('Id não informado');

    const param = await this.repository.findOne({ id, userId });

    if (!param) throw new NotFoundException('Biografia não encontrada');

    return param;
  }
}

