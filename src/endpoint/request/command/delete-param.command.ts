
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Param } from 'src/entity/request/param.entity';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

export class DeleteParamCommand implements ICommand {
  constructor(public param: Param) {}
}

@CommandHandler(DeleteParamCommand)
export class DeleteParamCommandHandler
  implements ICommandHandler<DeleteParamCommand>
{
  constructor(
    @InjectRepository(Param)
    private readonly repository: Repository<Param>,
  ) {}

  async execute(command: DeleteParamCommand): Promise<DeleteResult> {
    const { param } = command;

    const entity = this.repository.create(param);
    return await this.repository.delete(entity);
  }
}

