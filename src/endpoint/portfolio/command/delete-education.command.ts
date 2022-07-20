
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Education } from 'src/entity/portfolio/education.entity';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

export class DeleteEducationCommand implements ICommand {
  constructor(public education: Education) {}
}

@CommandHandler(DeleteEducationCommand)
export class DeleteEducationCommandHandler
  implements ICommandHandler<DeleteEducationCommand>
{
  constructor(
    @InjectRepository(Education)
    private readonly repository: Repository<Education>,
  ) {}

  async execute(command: DeleteEducationCommand): Promise<DeleteResult> {
    const { education } = command;

    const entity = this.repository.create(education);
    return await this.repository.delete(entity);
  }
}

