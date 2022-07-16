import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

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

    if (!user) throw { code: 404, message: 'Usuário não encontrado' };

    return user;
  }
}
