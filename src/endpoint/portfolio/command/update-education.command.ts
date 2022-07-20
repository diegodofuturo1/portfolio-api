import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Education } from 'src/entity/portfolio/education.entity';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

export class UpdateEducationCommand implements ICommand {
  constructor(public oldEducation: Education, public newEducation: Education) {}
}

@CommandHandler(UpdateEducationCommand)
export class UpdateEducationCommandHandler
  implements ICommandHandler<UpdateEducationCommand>
{
  constructor(
    @InjectRepository(Education)
    private readonly repository: Repository<Education>,
  ) {}

  async execute(command: UpdateEducationCommand): Promise<UpdateResult> {
    const { oldEducation, newEducation } = command;

    return await this.repository.update(oldEducation, newEducation);
  }
}

