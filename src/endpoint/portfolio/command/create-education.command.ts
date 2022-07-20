
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { Education } from 'src/entity/portfolio/education.entity';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

export class CreateEducationCommand implements ICommand {
  constructor(public education: Education) {}
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
    const { education } = command;

    if (!education.school) throw new BadRequestException('Escola/Faculdade não informada');
		if (!education.classroom) throw new BadRequestException('Curso não informado');
		if (!education.image) throw new BadRequestException('Image não fornecida');
		if (!education.nivel) throw new BadRequestException('Nível não informado');
		if (!education.duration) throw new BadRequestException('Duração não informado');
		if (!education.period) throw new BadRequestException('Período não informado');
		if (!education.details) throw new BadRequestException('Detalhes não informado');

    const entity = this.repository.create(education);
    return await this.repository.save(entity);
  }
}

