import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Experience } from 'src/entity/portfolio/experience.entity';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

export class UpdateExperienceCommand implements ICommand {
  constructor(public oldExperience: Experience, public newExperience: Experience) {}
}

@CommandHandler(UpdateExperienceCommand)
export class UpdateExperienceCommandHandler
  implements ICommandHandler<UpdateExperienceCommand>
{
  constructor(
    @InjectRepository(Experience)
    private readonly repository: Repository<Experience>,
  ) {}

  async execute(command: UpdateExperienceCommand): Promise<UpdateResult> {
    const { oldExperience, newExperience } = command;

    return await this.repository.update(oldExperience, newExperience);
  }
}

