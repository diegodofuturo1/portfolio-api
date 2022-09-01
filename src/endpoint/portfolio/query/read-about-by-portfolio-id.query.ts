import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { About } from 'src/entity/portfolio/about.entity';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { alphanumericSorter } from 'utils/order';

export class ReadAboutByPortfolioIdQuery implements IQuery {
  constructor(public readonly portfolioId: string, public userId: string) {}
}

@QueryHandler(ReadAboutByPortfolioIdQuery)
export class ReadAboutByPortfolioIdQueryHandler
  implements IQueryHandler<ReadAboutByPortfolioIdQuery>
{
  constructor(
    @InjectRepository(About)
    private readonly repository: Repository<About>,
  ) {}

  async execute(query: ReadAboutByPortfolioIdQuery): Promise<About[]> {
    const { portfolioId, userId } = query;

    if (!portfolioId) throw new BadRequestException('Id não informado');

    const about = await this.repository.find({ portfolioId, userId });

    return about.sort(alphanumericSorter);
  }
}
