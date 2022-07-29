var fs = require('fs');

const template = `
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { <entity> } from 'src/entity/<path>/<name>.entity';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

export class Delete<entity>Command implements ICommand {
  constructor(public <name>: <entity>) {}
}

@CommandHandler(Delete<entity>Command)
export class Delete<entity>CommandHandler
  implements ICommandHandler<Delete<entity>Command>
{
  constructor(
    @InjectRepository(<entity>)
    private readonly repository: Repository<<entity>>,
  ) {}

  async execute(command: Delete<entity>Command): Promise<DeleteResult> {
    const { <name> } = command;

    const entity = this.repository.create(<name>);
    return await this.repository.delete(entity);
  }
}

`;

const execute = (entity, path) => {
  const name = entity.toLocaleLowerCase();

  const query = template
    .replace(new RegExp('<entity>', 'g'), entity)
    .replace(new RegExp('<name>', 'g'), name)
    .replace(new RegExp('<path>', 'g'), path);

  fs.writeFileSync(
    `src/endpoint/${path}/command/delete-${name}.command.ts`,
    query,
  );
};

execute('Endpoint', 'request');
execute('Param', 'request');
