
import { Repository } from 'typeorm';
import { Experience } from 'src/entity/portfolio/experience.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class ReadExperienceByIdQuery implements IQuery {
  constructor(public readonly id: string, public userId: string) {}
}

@QueryHandler(ReadExperienceByIdQuery)
export class ReadExperienceByIdQueryHandler
  implements IQueryHandler<ReadExperienceByIdQuery>
{
  constructor(
    @InjectRepository(Experience)
    private readonly repository: Repository<Experience>,
  ) {}

  async execute(query: ReadExperienceByIdQuery): Promise<any> {
    const { id, userId } = query;

    if (!id) throw new BadRequestException('Id não informado');

    const experience = await this.repository.findOne({ id, userId });

    if (!experience) throw new NotFoundException('Biografia não encontrada');

    return experience;
  }
}

