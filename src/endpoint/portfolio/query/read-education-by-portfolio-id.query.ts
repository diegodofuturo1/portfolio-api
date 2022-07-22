
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { Education } from 'src/entity/portfolio/education.entity';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class ReadEducationByPortfolioIdQuery implements IQuery {
  constructor(public readonly portfolioId: string, public userId: string) {}
}

@QueryHandler(ReadEducationByPortfolioIdQuery)
export class ReadEducationByPortfolioIdQueryHandler
  implements IQueryHandler<ReadEducationByPortfolioIdQuery>
{
  constructor(
    @InjectRepository(Education)
    private readonly repository: Repository<Education>,
  ) {}

  async execute(query: ReadEducationByPortfolioIdQuery): Promise<Education[]> {
    const { portfolioId, userId } = query;

    if (!portfolioId) throw new BadRequestException('Id não informado');

    const education = await this.repository.find({ portfolioId, userId });

    return education;
  }
}

