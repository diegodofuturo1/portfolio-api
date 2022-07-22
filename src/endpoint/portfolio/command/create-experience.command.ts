
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { Experience } from 'src/entity/portfolio/experience.entity';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { ExperienceDto } from '../dto/experience.dto';

export class CreateExperienceCommand implements ICommand {
  constructor(public experience: ExperienceDto, public userId: string) {}
}

@CommandHandler(CreateExperienceCommand)
export class CreateExperienceCommandHandler
  implements ICommandHandler<CreateExperienceCommand>
{
  constructor(
    @InjectRepository(Experience)
    private readonly repository: Repository<Experience>,
  ) {}

  async execute(command: CreateExperienceCommand): Promise<Experience> {
    const { experience, userId } = command;

    if (!experience.company) throw new BadRequestException('Empresa não informada');
		if (!experience.role) throw new BadRequestException('Função/Cargo não informado');
		if (!experience.image) throw new BadRequestException('Imagem não fornecida');
		if (!experience.duration) throw new BadRequestException('Duração não informada');
		if (!experience.from) throw new BadRequestException('De não informado');
		if (!experience.to) throw new BadRequestException('Até não informado');
		if (!experience.details) throw new BadRequestException('Detalhes não informado');

    const entity = this.repository.create({ ...experience, userId });
    return await this.repository.save(entity);
  }
}

