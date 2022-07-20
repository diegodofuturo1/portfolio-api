import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Skill } from 'src/entity/portfolio/skill.entity';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

export class UpdateSkillCommand implements ICommand {
  constructor(public oldSkill: Skill, public newSkill: Skill) {}
}

@CommandHandler(UpdateSkillCommand)
export class UpdateSkillCommandHandler
  implements ICommandHandler<UpdateSkillCommand>
{
  constructor(
    @InjectRepository(Skill)
    private readonly repository: Repository<Skill>,
  ) {}

  async execute(command: UpdateSkillCommand): Promise<UpdateResult> {
    const { oldSkill, newSkill } = command;

    return await this.repository.update(oldSkill, newSkill);
  }
}

