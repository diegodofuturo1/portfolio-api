import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Endpoint } from 'src/entity/request/endpoint.entity';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

export class UpdateEndpointCommand implements ICommand {
  constructor(public oldEndpoint: Endpoint, public newEndpoint: Endpoint) {}
}

@CommandHandler(UpdateEndpointCommand)
export class UpdateEndpointCommandHandler
  implements ICommandHandler<UpdateEndpointCommand>
{
  constructor(
    @InjectRepository(Endpoint)
    private readonly repository: Repository<Endpoint>,
  ) {}

  async execute(command: UpdateEndpointCommand): Promise<UpdateResult> {
    const { oldEndpoint, newEndpoint } = command;

    return await this.repository.update(oldEndpoint, newEndpoint);
  }
}

