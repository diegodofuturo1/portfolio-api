import { Repository } from 'typeorm';
import { Endpoint } from 'src/entity/request/endpoint.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class ReadEndpointByIdQuery implements IQuery {
  constructor(public readonly id: string, public userId: string) {}
}

@QueryHandler(ReadEndpointByIdQuery)
export class ReadEndpointByIdQueryHandler implements IQueryHandler<ReadEndpointByIdQuery> {
  constructor(
    @InjectRepository(Endpoint)
    private readonly repository: Repository<Endpoint>,
  ) {}

  async execute(query: ReadEndpointByIdQuery): Promise<any> {
    const { id, userId } = query;

    if (!id) throw new BadRequestException('Id não informado');

    const endpoint = await this.repository.findOne({ where: { id, userId } });

    if (!endpoint) throw new NotFoundException('Biografia não encontrada');

    return endpoint;
  }
}
