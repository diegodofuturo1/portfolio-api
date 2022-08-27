import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UserPreferencesDto } from 'src/endpoint/auth/dto/user-change.dto';

export class UpdateUserCommand implements ICommand {
  constructor(public user: User, public preferences: UserPreferencesDto) {}
}

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    const { user, preferences } = command;

    const entity = this.repository.create({ ...user, ...preferences });
    return await this.repository.save({ ...entity });
  }
}
