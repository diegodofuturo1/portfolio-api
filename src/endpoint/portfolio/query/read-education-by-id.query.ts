
import { Repository } from 'typeorm';
import { Education } from 'src/entity/portfolio/education.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class ReadEducationByIdQuery implements IQuery {
  constructor(public readonly id: string, public userId: string) {}
}

@QueryHandler(ReadEducationByIdQuery)
export class ReadEducationByIdQueryHandler
  implements IQueryHandler<ReadEducationByIdQuery>
{
  constructor(
    @InjectRepository(Education)
    private readonly repository: Repository<Education>,
  ) {}

  async execute(query: ReadEducationByIdQuery): Promise<any> {
    const { id, userId } = query;

    if (!id) throw new BadRequestException('Id não informado');

    const education = await this.repository.findOne({ id, userId });

    if (!education) throw new NotFoundException('Biografia não encontrada');

    return education;
  }
}

