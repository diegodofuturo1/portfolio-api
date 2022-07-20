
import { Repository } from 'typeorm';
import { Portfolio } from 'src/entity/portfolio/portfolio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class ReadPortfolioByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(ReadPortfolioByIdQuery)
export class ReadPortfolioByIdQueryHandler
  implements IQueryHandler<ReadPortfolioByIdQuery>
{
  constructor(
    @InjectRepository(Portfolio)
    private readonly repository: Repository<Portfolio>,
  ) {}

  async execute(query: ReadPortfolioByIdQuery): Promise<any> {
    const { id } = query;

    if (!id) throw new BadRequestException('Id não informado');

    const portfolio = await this.repository.findOne({ id });

    if (!portfolio) throw new NotFoundException('Biografia não encontrada');

    return portfolio;
  }
}

