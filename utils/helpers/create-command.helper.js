var fs = require('fs');

const template = `
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { <entity> } from 'src/entity/<path>/<name>.entity';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { <entity>Dto } from '../dto/<name>.dto';

export class Create<entity>Command implements ICommand {
  constructor(public <name>: <entity>Dto, public userId: string) {}
}

@CommandHandler(Create<entity>Command)
export class Create<entity>CommandHandler
  implements ICommandHandler<Create<entity>Command>
{
  constructor(
    @InjectRepository(<entity>)
    private readonly repository: Repository<<entity>>,
  ) {}

  async execute(command: Create<entity>Command): Promise<<entity>> {
    const { <name>, userId } = command;

    <validations>

    const entity = this.repository.create({ ...<name>, userId });
    return await this.repository.save(entity);
  }
}

`;

const execute = (entity, path, validations) => {
  const name = entity.toLocaleLowerCase();

  const _validations = [];

  for (const validation in validations) {
    _validations.push(
      `if (!${name}.${validation}) throw new BadRequestException('${validations[validation]}');`,
    );
  }
  const query = template
    .replace(new RegExp('<entity>', 'g'), entity)
    .replace(new RegExp('<name>', 'g'), name)
    .replace(new RegExp('<path>', 'g'), path)
    .replace(new RegExp('<validations>', 'g'), _validations.join('\n\t\t'));

  fs.writeFileSync(
    `src/endpoint/${path}/command/create-${name}.command.ts`,
    query,
  );
};

execute('Param', 'request', {
  key: 'Chave não informado',
  value: 'Valor não informado',
  type: 'Tipo não informado',
});
