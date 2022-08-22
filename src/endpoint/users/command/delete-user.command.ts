import { User } from 'src/entity/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

export class DeleteUserCommand implements ICommand {
  constructor(public user: User) {}
}

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async execute(command: DeleteUserCommand): Promise<DeleteResult> {
    const { user } = command;
    const entity = this.repository.create(user);
    return await this.repository.delete(entity);
  }
}
