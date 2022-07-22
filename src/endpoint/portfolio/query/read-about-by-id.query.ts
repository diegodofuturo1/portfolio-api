
import { Repository } from 'typeorm';
import { About } from 'src/entity/portfolio/about.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class ReadAboutByIdQuery implements IQuery {
  constructor(public readonly id: string, public userId: string) {}
}

@QueryHandler(ReadAboutByIdQuery)
export class ReadAboutByIdQueryHandler
  implements IQueryHandler<ReadAboutByIdQuery>
{
  constructor(
    @InjectRepository(About)
    private readonly repository: Repository<About>,
  ) {}

  async execute(query: ReadAboutByIdQuery): Promise<any> {
    const { id, userId } = query;

    if (!id) throw new BadRequestException('Id não informado');

    const about = await this.repository.findOne({ id, userId });

    if (!about) throw new NotFoundException('Biografia não encontrada');

    return about;
  }
}

