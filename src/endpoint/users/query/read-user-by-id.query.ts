import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
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

    if (!id) throw new BadRequestException('Id não informado');

    const user = await this.repository.findOne({ id });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return user;
  }
}
