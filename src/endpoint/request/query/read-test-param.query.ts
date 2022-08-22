import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TestParam } from 'src/entity';

export class ReadTestParamQuery implements IQuery {
  constructor(public testId: string, public userId: string) {}
}

@QueryHandler(ReadTestParamQuery)
export class ReadTestParamQueryHandler implements IQueryHandler<ReadTestParamQuery> {
  constructor(
    @InjectRepository(TestParam)
    private readonly repository: Repository<TestParam>,
  ) {}

  async execute(query: ReadTestParamQuery): Promise<TestParam[]> {
    const { userId, testId } = query;

    const test = await this.repository.find({ userId, testId });

    if (!test) throw new NotFoundException('Parâmetro não encontrado');

    return test;
  }
}
