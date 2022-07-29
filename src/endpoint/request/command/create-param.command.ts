
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { Param } from 'src/entity/request/param.entity';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { ParamDto } from '../dto/param.dto';

export class CreateParamCommand implements ICommand {
  constructor(public param: ParamDto, public userId: string) {}
}

@CommandHandler(CreateParamCommand)
export class CreateParamCommandHandler
  implements ICommandHandler<CreateParamCommand>
{
  constructor(
    @InjectRepository(Param)
    private readonly repository: Repository<Param>,
  ) {}

  async execute(command: CreateParamCommand): Promise<Param> {
    const { param, userId } = command;

    if (!param.key) throw new BadRequestException('Chave não informado');
		if (!param.value) throw new BadRequestException('Valor não informado');
		if (!param.type) throw new BadRequestException('Tipo não informado');

    const entity = this.repository.create({ ...param, userId });
    return await this.repository.save(entity);
  }
}

