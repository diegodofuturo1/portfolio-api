import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { Param } from 'src/entity/request/param.entity';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class ReadParamByEndpointIdQuery implements IQuery {
  constructor(public readonly endpointId: string, public userId: string) {}
}

@QueryHandler(ReadParamByEndpointIdQuery)
export class ReadParamByEndpointIdQueryHandler
  implements IQueryHandler<ReadParamByEndpointIdQuery>
{
  constructor(
    @InjectRepository(Param)
    private readonly repository: Repository<Param>,
  ) {}

  async execute(query: ReadParamByEndpointIdQuery): Promise<Param[]> {
    const { endpointId, userId } = query;

    if (!endpointId) throw new BadRequestException('Id não informado');

    const param = await this.repository.find({ where: { endpointId, userId } });

    return param;
  }
}
