import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

export class ReadUserByEmailQuery implements IQuery {
  constructor(public readonly email: string) {}
}

@QueryHandler(ReadUserByEmailQuery)
export class ReadUserByEmailQueryHandler
  implements IQueryHandler<ReadUserByEmailQuery>
{
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async execute(query: ReadUserByEmailQuery): Promise<any> {
    const { email } = query;

    if (!email) throw new BadRequestException('Email inválido');

    const user = await this.repository.findOne({ email });

    if (!user) throw new NotFoundException('Usuário não encontrado!');

    return user;
  }
}
