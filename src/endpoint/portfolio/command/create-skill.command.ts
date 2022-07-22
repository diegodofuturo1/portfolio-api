
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { Skill } from 'src/entity/portfolio/skill.entity';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { SkillDto } from '../dto/skill.dto';

export class CreateSkillCommand implements ICommand {
  constructor(public skill: SkillDto, public userId: string) {}
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
    const { skill, userId } = command;

    if (!skill.skill) throw new BadRequestException('Habilidade não informada');
		if (!skill.rating) throw new BadRequestException('Avaliação não informada');

    const entity = this.repository.create({ ...skill, userId });
    return await this.repository.save(entity);
  }
}

