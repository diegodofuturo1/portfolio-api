var fs = require('fs');

const template = `
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { <Entity> } from 'src/entity/<path>/<entity>.entity';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class Read<Entity>By<Foreign>IdQuery implements IQuery {
  constructor(public readonly <foreign>Id: string) {}
}

@QueryHandler(Read<Entity>By<Foreign>IdQuery)
export class Read<Entity>By<Foreign>IdQueryHandler
  implements IQueryHandler<Read<Entity>By<Foreign>IdQuery>
{
  constructor(
    @InjectRepository(<Entity>)
    private readonly repository: Repository<<Entity>>,
  ) {}

  async execute(query: Read<Entity>By<Foreign>IdQuery): Promise<<Entity>[]> {
    const { <foreign>Id } = query;

    if (!<foreign>Id) throw new BadRequestException('Id não informado');

    const <entity> = await this.repository.find({ <foreign>Id });

    return <entity>;
  }
}

`;

const execute = (Entity, Foreign, path) => {
  const entity = Entity.toLocaleLowerCase();
  const foreign = Foreign.toLocaleLowerCase();

  const query = template
    .replace(new RegExp('<Entity>', 'g'), Entity)
    .replace(new RegExp('<entity>', 'g'), entity)
    .replace(new RegExp('<Foreign>', 'g'), Foreign)
    .replace(new RegExp('<foreign>', 'g'), foreign)
    .replace(new RegExp('<path>', 'g'), path);

  fs.writeFileSync(
    `src/endpoint/${path}/query/read-${entity}-by-${foreign}-id-query.ts`,
    query,
  );
};

execute(`Skill`, 'Experience', 'portfolio');
execute(`Experience`, 'Portfolio', 'portfolio');
execute(`Education`, 'Portfolio', 'portfolio');
execute(`About`, 'Portfolio', 'portfolio');
