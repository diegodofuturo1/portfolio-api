var fs = require('fs');

const template = `
import { Repository } from 'typeorm';
import { <entity> } from 'src/entity/<path>/<name>.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class Read<entity>ByIdQuery implements IQuery {
  constructor(public readonly id: string, public userId: string) {}
}

@QueryHandler(Read<entity>ByIdQuery)
export class Read<entity>ByIdQueryHandler
  implements IQueryHandler<Read<entity>ByIdQuery>
{
  constructor(
    @InjectRepository(<entity>)
    private readonly repository: Repository<<entity>>,
  ) {}

  async execute(query: Read<entity>ByIdQuery): Promise<any> {
    const { id, userId } = query;

    if (!id) throw new BadRequestException('Id não informado');

    const <name> = await this.repository.findOne({ id, userId });

    if (!<name>) throw new NotFoundException('Biografia não encontrada');

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

  fs.writeFileSync(
    `src/endpoint/${path}/query/read-${name}-by-id.query.ts`,
    query,
  );

  console.log(
    `[SUCESSO] - arquivo criado: src/endpoint/${path}/query/read-${name}-by-id.query.ts`,
  );
};

execute('About', 'portfolio');
execute(`Education`, 'portfolio');
execute('Experience', 'portfolio');
execute(`Portfolio`, 'portfolio');
execute(`Skill`, 'portfolio');
