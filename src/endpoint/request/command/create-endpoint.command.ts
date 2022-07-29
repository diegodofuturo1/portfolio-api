import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { Endpoint } from 'src/entity/request/endpoint.entity';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { EndpointDto } from '../dto/endpoint.dto';

export class CreateEndpointCommand implements ICommand {
  constructor(public endpoint: EndpointDto, public userId: string) {}
}

@CommandHandler(CreateEndpointCommand)
export class CreateEndpointCommandHandler
  implements ICommandHandler<CreateEndpointCommand>
{
  constructor(
    @InjectRepository(Endpoint)
    private readonly repository: Repository<Endpoint>,
  ) {}

  async execute(command: CreateEndpointCommand): Promise<Endpoint> {
    const { endpoint, userId } = command;

    if (!endpoint.name) throw new BadRequestException('Nome não informado');
    if (!endpoint.path) throw new BadRequestException('Path não informado');
    if (!endpoint.method) throw new BadRequestException('Método não informado');
    if (!endpoint.permission)
      throw new BadRequestException('Permissão não informado');

    const entity = this.repository.create({ ...endpoint, userId });
    return await this.repository.save(entity);
  }
}
