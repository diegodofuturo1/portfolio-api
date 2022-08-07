var fs = require('fs');

const template = `
import { Repository } from 'typeorm';
import { <entity> } from 'src/entity/<path>/<name>.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class Read<entity>Query implements IQuery {
  constructor(public userId: string) {}
}

@QueryHandler(Read<entity>Query)
export class Read<entity>QueryHandler
  implements IQueryHandler<Read<entity>Query>
{
  constructor(
    @InjectRepository(<entity>)
    private readonly repository: Repository<<entity>>,
  ) {}

  async execute(query: Read<entity>Query): Promise<any> {
    const { userId } = query;

    const <name> = await this.repository.find({ userId });

    if (!<name>) throw new NotFoundException('<> não encontrada');

    return <name>;
  }
}

`;

const execute = (entity, path) => {
  const name = entity.toLocaleLowerCase();
  const query = template
    .replace(new RegExp('<entity>', 'g'), entity)
    .replace(new RegExp('<name>', 'g'), name)
    .replace(new RegExp('<path>', 'g'), path);

  fs.writeFileSync(`src/endpoint/${path}/query/read-${name}.query.ts`, query);

  console.log(
    `[SUCESSO] - arquivo criado: src/endpoint/${path}/query/read-${name}.query.ts`,
  );
};

execute('Endpoint', 'request');
execute(`Param`, 'request');
