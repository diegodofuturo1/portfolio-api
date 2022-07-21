
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { Portfolio } from 'src/entity/portfolio/portfolio.entity';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { PortfolioDto } from '../dto/portfolio.dto';

export class CreatePortfolioCommand implements ICommand {
  constructor(public portfolio: PortfolioDto) {}
}

@CommandHandler(CreatePortfolioCommand)
export class CreatePortfolioCommandHandler
  implements ICommandHandler<CreatePortfolioCommand>
{
  constructor(
    @InjectRepository(Portfolio)
    private readonly repository: Repository<Portfolio>,
  ) {}

  async execute(command: CreatePortfolioCommand): Promise<Portfolio> {
    const { portfolio } = command;

    if (!portfolio.owner) throw new BadRequestException('Nome não informado');
		if (!portfolio.avatar) throw new BadRequestException('Avatar não fornecido');

    const entity = this.repository.create(portfolio);
    return await this.repository.save(entity);
  }
}

