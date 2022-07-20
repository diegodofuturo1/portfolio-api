import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { About } from 'src/entity/portfolio/about.entity';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class ReadAboutByPortfolioIdQuery implements IQuery {
  constructor(public portfolioId: string) {}
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
    const { portfolioId } = query;
    const abouts = await this.repository.find({ portfolioId });
    return abouts;
  }
}
