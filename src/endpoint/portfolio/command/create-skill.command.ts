
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { Skill } from 'src/entity/portfolio/skill.entity';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

export class CreateSkillCommand implements ICommand {
  constructor(public skill: Skill) {}
}

@CommandHandler(CreateSkillCommand)
export class CreateSkillCommandHandler
  implements ICommandHandler<CreateSkillCommand>
{
  constructor(
    @InjectRepository(Skill)
    private readonly repository: Repository<Skill>,
  ) {}

  async execute(command: CreateSkillCommand): Promise<Skill> {
    const { skill } = command;

    if (!skill.skill) throw new BadRequestException('Habilidade não informada');
		if (!skill.rating) throw new BadRequestException('Avaliação não informada');

    const entity = this.repository.create(skill);
    return await this.repository.save(entity);
  }
}

