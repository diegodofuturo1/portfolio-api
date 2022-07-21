import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { About } from 'src/entity/portfolio/about.entity';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class ReadAboutByIdQuery implements IQuery {
  constructor(public portfolioId: string) {}
}

@QueryHandler(ReadAboutByIdQuery)
export class ReadAboutByIdQueryHandler
  implements IQueryHandler<ReadAboutByIdQuery>
{
  constructor(
    @InjectRepository(About)
    private readonly repository: Repository<About>,
  ) {}

  async execute(query: ReadAboutByIdQuery): Promise<About[]> {
    const { portfolioId } = query;
    const abouts = await this.repository.find({ portfolioId });
    return abouts;
  }
}
