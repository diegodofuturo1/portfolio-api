import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './command/create-user.command';
import { ReadUserByIdQuery } from './query/read-user-by-id.query';
import { ReadUserByEmailQuery } from './query/read-user-by-email.query';
import { SignUpDto } from '../auth/dto/signup.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async getUserById(id: string) {
    return await this.queryBus.execute(new ReadUserByIdQuery(id));
  }

  async getUserByEmail(email: string) {
    return await this.queryBus.execute(new ReadUserByEmailQuery(email));
  }

  async createUser(user: SignUpDto) {
    return await this.commandBus.execute(new CreateUserCommand(user));
  }
}
