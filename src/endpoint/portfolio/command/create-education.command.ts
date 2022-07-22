
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { Education } from 'src/entity/portfolio/education.entity';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { EducationDto } from '../dto/education.dto';

export class CreateEducationCommand implements ICommand {
  constructor(public education: EducationDto, public userId: string) {}
}

@CommandHandler(CreateEducationCommand)
export class CreateEducationCommandHandler
  implements ICommandHandler<CreateEducationCommand>
{
  constructor(
    @InjectRepository(Education)
    private readonly repository: Repository<Education>,
  ) {}

  async execute(command: CreateEducationCommand): Promise<Education> {
    const { education, userId } = command;

    if (!education.school) throw new BadRequestException('Escola/Faculdade não informada');
		if (!education.classroom) throw new BadRequestException('Curso não informado');
		if (!education.image) throw new BadRequestException('Image não fornecida');
		if (!education.nivel) throw new BadRequestException('Nível não informado');
		if (!education.duration) throw new BadRequestException('Duração não informado');
		if (!education.period) throw new BadRequestException('Período não informado');
		if (!education.details) throw new BadRequestException('Detalhes não informado');

    const entity = this.repository.create({ ...education, userId });
    return await this.repository.save(entity);
  }
}

