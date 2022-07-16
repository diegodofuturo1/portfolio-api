import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

export class CreateUserCommand implements ICommand {
  constructor(public user: User) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const { user } = command;
    const entity = this.repository.create(user);
    return await this.repository.save(entity);
  }
}
