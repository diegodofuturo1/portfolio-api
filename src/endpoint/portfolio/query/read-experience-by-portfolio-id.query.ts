
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { Experience } from 'src/entity/portfolio/experience.entity';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class ReadExperienceByPortfolioIdQuery implements IQuery {
  constructor(public readonly portfolioId: string, public userId: string) {}
}

@QueryHandler(ReadExperienceByPortfolioIdQuery)
export class ReadExperienceByPortfolioIdQueryHandler
  implements IQueryHandler<ReadExperienceByPortfolioIdQuery>
{
  constructor(
    @InjectRepository(Experience)
    private readonly repository: Repository<Experience>,
  ) {}

  async execute(query: ReadExperienceByPortfolioIdQuery): Promise<Experience[]> {
    const { portfolioId, userId } = query;

    if (!portfolioId) throw new BadRequestException('Id não informado');

    const experience = await this.repository.find({ portfolioId, userId });

    return experience;
  }
}

