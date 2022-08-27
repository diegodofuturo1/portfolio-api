import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './command/create-user.command';
import { ReadUserByIdQuery } from './query/read-user-by-id.query';
import { ReadUserByEmailQuery } from './query/read-user-by-email.query';
import { SignUpDto } from '../auth/dto/signup.dto';
import { DeleteUserCommand } from './command/delete-user.command';
import { UserPreferencesDto } from '../auth/dto/user-change.dto';
import { UpdateUserCommand } from './command/update-user.command';

@Injectable()
export class UserService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  async getUserById(id: string) {
    return await this.queryBus.execute(new ReadUserByIdQuery(id));
  }

  async getUserByEmail(email: string) {
    return await this.queryBus.execute(new ReadUserByEmailQuery(email));
  }

  async createUser(user: SignUpDto) {
    return await this.commandBus.execute(new CreateUserCommand(user));
  }

  async deleteUserByEmail(email: string, userId: string) {
    const user = await this.getUserByEmail(email);
    return await this.commandBus.execute(new DeleteUserCommand(user));
  }

  async updatePreferencesUser(preferences: UserPreferencesDto, userId: string) {
    const user = await this.getUserById(userId);
    return await this.commandBus.execute(new UpdateUserCommand(user, preferences));
  }
}
