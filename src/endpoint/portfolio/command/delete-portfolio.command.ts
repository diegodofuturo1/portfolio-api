
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from 'src/entity/portfolio/portfolio.entity';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

export class DeletePortfolioCommand implements ICommand {
  constructor(public portfolio: Portfolio) {}
}

@CommandHandler(DeletePortfolioCommand)
export class DeletePortfolioCommandHandler
  implements ICommandHandler<DeletePortfolioCommand>
{
  constructor(
    @InjectRepository(Portfolio)
    private readonly repository: Repository<Portfolio>,
  ) {}

  async execute(command: DeletePortfolioCommand): Promise<DeleteResult> {
    const { portfolio } = command;

    const entity = this.repository.create(portfolio);
    return await this.repository.delete(entity);
  }
}

