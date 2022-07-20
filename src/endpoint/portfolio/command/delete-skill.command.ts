
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from 'src/entity/portfolio/skill.entity';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

export class DeleteSkillCommand implements ICommand {
  constructor(public skill: Skill) {}
}

@CommandHandler(DeleteSkillCommand)
export class DeleteSkillCommandHandler
  implements ICommandHandler<DeleteSkillCommand>
{
  constructor(
    @InjectRepository(Skill)
    private readonly repository: Repository<Skill>,
  ) {}

  async execute(command: DeleteSkillCommand): Promise<DeleteResult> {
    const { skill } = command;

    const entity = this.repository.create(skill);
    return await this.repository.delete(entity);
  }
}

