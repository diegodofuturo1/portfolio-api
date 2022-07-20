import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Portfolio } from 'src/entity/portfolio/portfolio.entity';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

export class UpdatePortfolioCommand implements ICommand {
  constructor(public oldPortfolio: Portfolio, public newPortfolio: Portfolio) {}
}

@CommandHandler(UpdatePortfolioCommand)
export class UpdatePortfolioCommandHandler
  implements ICommandHandler<UpdatePortfolioCommand>
{
  constructor(
    @InjectRepository(Portfolio)
    private readonly repository: Repository<Portfolio>,
  ) {}

  async execute(command: UpdatePortfolioCommand): Promise<UpdateResult> {
    const { oldPortfolio, newPortfolio } = command;

    return await this.repository.update(oldPortfolio, newPortfolio);
  }
}

