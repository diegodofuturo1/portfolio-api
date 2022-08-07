import { Repository } from 'typeorm';
import { Endpoint } from 'src/entity/request/endpoint.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class ReadEndpointQuery implements IQuery {
  constructor(public userId: string) {}
}

@QueryHandler(ReadEndpointQuery)
export class ReadEndpointQueryHandler
  implements IQueryHandler<ReadEndpointQuery>
{
  constructor(
    @InjectRepository(Endpoint)
    private readonly repository: Repository<Endpoint>,
  ) {}

  async execute(query: ReadEndpointQuery): Promise<any> {
    const { userId } = query;

    const endpoint = await this.repository.find({ userId });

    if (!endpoint) throw new NotFoundException('Endpoint não encontrado');

    return endpoint;
  }
}
