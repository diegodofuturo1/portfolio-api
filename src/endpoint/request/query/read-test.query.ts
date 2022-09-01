import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Test } from 'src/entity/request/test.entity';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { alphanumericSorter } from 'utils/order';

export class ReadTestQuery implements IQuery {
  constructor(public userId: string) {}
}

@QueryHandler(ReadTestQuery)
export class ReadTestQueryHandler implements IQueryHandler<ReadTestQuery> {
  constructor(
    @InjectRepository(Test)
    private readonly repository: Repository<Test>,
  ) {}

  async execute(query: ReadTestQuery): Promise<Test[]> {
    const { userId } = query;

    const test = await this.repository.find({ userId });

    if (!test) throw new NotFoundException('Parâmetro não encontrado');

    return test.sort(alphanumericSorter);
  }
}
