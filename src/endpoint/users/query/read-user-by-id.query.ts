import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class ReadUserByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(ReadUserByIdQuery)
export class ReadUserByIdQueryHandler
  implements IQueryHandler<ReadUserByIdQuery>
{
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async execute(query: ReadUserByIdQuery): Promise<any> {
    const { id } = query;
    const user = await this.repository.findOne({ id });

    if (!user) throw new BadRequestException('Usuário não encontrado');

    return user;
  }
}
