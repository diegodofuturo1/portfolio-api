import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { About } from 'src/entity/portfolio/about.entity';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

export class UpdateAboutCommand implements ICommand {
  constructor(public oldAbout: About, public newAbout: About) {}
}

@CommandHandler(UpdateAboutCommand)
export class UpdateAboutCommandHandler
  implements ICommandHandler<UpdateAboutCommand>
{
  constructor(
    @InjectRepository(About)
    private readonly repository: Repository<About>,
  ) {}

  async execute(command: UpdateAboutCommand): Promise<UpdateResult> {
    const { oldAbout, newAbout } = command;

    return await this.repository.update(oldAbout, newAbout);
  }
}

