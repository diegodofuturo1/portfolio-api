import { Repository } from 'typeorm';
import { Portfolio } from 'src/entity/portfolio/portfolio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class ReadPortfolioQuery implements IQuery {
  constructor(public userId: string) {}
}

@QueryHandler(ReadPortfolioQuery)
export class ReadPortfolioQueryHandler implements IQueryHandler<ReadPortfolioQuery> {
  constructor(
    @InjectRepository(Portfolio)
    private readonly repository: Repository<Portfolio>,
  ) {}

  async execute(query: ReadPortfolioQuery): Promise<Portfolio[]> {
    const { userId } = query;

    const portfolios = await this.repository.find({ where: { userId } });

    if (!portfolios) throw new NotFoundException('Portfólio não encontrado');

    return portfolios;
  }
}
