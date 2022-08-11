import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { SignUpDto } from 'src/endpoint/auth/dto/signup.dto';
import { UserDto } from 'src/endpoint/auth/dto/user.dto';

export class CreateUserCommand implements ICommand {
  constructor(public user: SignUpDto) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async execute(command: CreateUserCommand): Promise<UserDto> {
    const { user } = command;

    if (!user.name) throw new BadRequestException('Nome não informado');
    if (!user.email) throw new BadRequestException('Email não informado');
    if (!user.password) throw new BadRequestException('Senha não informada');

    const entity = this.repository.create(user);
    return await this.repository.save({ ...entity, token: `` });
  }
}
