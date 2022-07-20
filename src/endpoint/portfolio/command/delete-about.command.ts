
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { About } from 'src/entity/portfolio/about.entity';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

export class DeleteAboutCommand implements ICommand {
  constructor(public about: About) {}
}

@CommandHandler(DeleteAboutCommand)
export class DeleteAboutCommandHandler
  implements ICommandHandler<DeleteAboutCommand>
{
  constructor(
    @InjectRepository(About)
    private readonly repository: Repository<About>,
  ) {}

  async execute(command: DeleteAboutCommand): Promise<DeleteResult> {
    const { about } = command;

    const entity = this.repository.create(about);
    return await this.repository.delete(entity);
  }
}

