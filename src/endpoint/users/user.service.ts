import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { User } from 'src/entity/user.entity';
import { CreateUserCommand } from './command/create-user.command';
import { ReadUserByIdQuery } from './query/read-user-by-id.query';

@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async getUserById(id: string) {
    return await this.queryBus.execute(new ReadUserByIdQuery(id));
  }
  async createUser(user: User) {
    return await this.commandBus.execute(new CreateUserCommand(user));
  }
}
