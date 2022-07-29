
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Endpoint } from 'src/entity/request/endpoint.entity';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

export class DeleteEndpointCommand implements ICommand {
  constructor(public endpoint: Endpoint) {}
}

@CommandHandler(DeleteEndpointCommand)
export class DeleteEndpointCommandHandler
  implements ICommandHandler<DeleteEndpointCommand>
{
  constructor(
    @InjectRepository(Endpoint)
    private readonly repository: Repository<Endpoint>,
  ) {}

  async execute(command: DeleteEndpointCommand): Promise<DeleteResult> {
    const { endpoint } = command;

    const entity = this.repository.create(endpoint);
    return await this.repository.delete(entity);
  }
}

