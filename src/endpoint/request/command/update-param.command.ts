import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Param } from 'src/entity/request/param.entity';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

export class UpdateParamCommand implements ICommand {
  constructor(public oldParam: Param, public newParam: Param) {}
}

@CommandHandler(UpdateParamCommand)
export class UpdateParamCommandHandler
  implements ICommandHandler<UpdateParamCommand>
{
  constructor(
    @InjectRepository(Param)
    private readonly repository: Repository<Param>,
  ) {}

  async execute(command: UpdateParamCommand): Promise<UpdateResult> {
    const { oldParam, newParam } = command;

    return await this.repository.update(oldParam, newParam);
  }
}

