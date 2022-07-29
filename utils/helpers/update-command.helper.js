var fs = require('fs');

const template = `import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { <entity> } from 'src/entity/<path>/<name>.entity';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

export class Update<entity>Command implements ICommand {
  constructor(public old<entity>: <entity>, public new<entity>: <entity>) {}
}

@CommandHandler(Update<entity>Command)
export class Update<entity>CommandHandler
  implements ICommandHandler<Update<entity>Command>
{
  constructor(
    @InjectRepository(<entity>)
    private readonly repository: Repository<<entity>>,
  ) {}

  async execute(command: Update<entity>Command): Promise<UpdateResult> {
    const { old<entity>, new<entity> } = command;

    return await this.repository.update(old<entity>, new<entity>);
  }
}

`;

const execute = (entity, path, validations) => {
  const name = entity.toLocaleLowerCase();

  const query = template
    .replace(new RegExp('<entity>', 'g'), entity)
    .replace(new RegExp('<name>', 'g'), name)
    .replace(new RegExp('<path>', 'g'), path);

  fs.writeFileSync(
    `src/endpoint/${path}/command/update-${name}.command.ts`,
    query,
  );
};

execute('Endpoint', 'request');
execute('Param', 'request');
