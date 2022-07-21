
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { About } from 'src/entity/portfolio/about.entity';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { AboutDto } from '../dto/about.dto';

export class CreateAboutCommand implements ICommand {
  constructor(public about: AboutDto) {}
}

@CommandHandler(CreateAboutCommand)
export class CreateAboutCommandHandler
  implements ICommandHandler<CreateAboutCommand>
{
  constructor(
    @InjectRepository(About)
    private readonly repository: Repository<About>,
  ) {}

  async execute(command: CreateAboutCommand): Promise<About> {
    const { about } = command;

    if (!about.title) throw new BadRequestException('Título não informado');
		if (!about.content) throw new BadRequestException('Conteúdo não informado');

    const entity = this.repository.create(about);
    return await this.repository.save(entity);
  }
}

