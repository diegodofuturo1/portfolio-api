
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from 'src/entity/portfolio/experience.entity';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

export class DeleteExperienceCommand implements ICommand {
  constructor(public experience: Experience) {}
}

@CommandHandler(DeleteExperienceCommand)
export class DeleteExperienceCommandHandler
  implements ICommandHandler<DeleteExperienceCommand>
{
  constructor(
    @InjectRepository(Experience)
    private readonly repository: Repository<Experience>,
  ) {}

  async execute(command: DeleteExperienceCommand): Promise<DeleteResult> {
    const { experience } = command;

    const entity = this.repository.create(experience);
    return await this.repository.delete(entity);
  }
}

