var fs = require('fs');

const template = `
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { <entities> } from 'src/entity';
import { <dto> } from './dto';
import { <query> } from './query';
import { <command> } from './command';

@Injectable()
export class <Path>Service {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  <functions>
}
`;

const functionTemplate = `
async create<Entity>(<entity>: <Entity>Dto, userId: string): Promise<<Entity>> {
  return await this.commandBus.execute(new Create<Entity>Command(<entity>, userId));
}

async read<Entity>byId(id: string, userId: string): Promise<<Entity>> {
  return await this.queryBus.execute(new Read<Entity>ByIdQuery(id, userId));
}
<optional>
async update<Entity>(id: string, <entity>: <Entity>Dto, userId: string): Promise<<Entity>> {
  const _<entity> = await this.read<Entity>byId(id, userId);
  return await this.commandBus.execute(new Update<Entity>Command(_<entity>, { ...<entity>, id, userId }));
}

async delete<Entity>(id: string, userId: string): Promise<<Entity>> {
  const _<entity> = await this.read<Entity>byId(id, userId);
  return await this.commandBus.execute(new Delete<Entity>Command(_<entity>));
}`;

const optional = `
async read<Entity>by<Foreign>Id(id: string, userId: string): Promise<<Entity>> {
  return await this.queryBus.execute(new Read<Entity>By<Foreign>IdQuery(id, userId));
}
`;

const execute = (entities, Path) => {
  const path = Path.toLocaleLowerCase();
  const params = {
    dtos: [],
    entities: [],
    commands: [],
    querys: [],
    functions: [],
  };

  for (const _entity of entities) {
    const { Entity, Foreign } = _entity;
    const entity = Entity.toLocaleLowerCase();
    const foreign = Foreign?.toLocaleLowerCase();

    params.dtos.push(`${Entity}Dto`);
    params.entities.push(Entity);
    params.commands.push(`Create${Entity}Command`);
    params.commands.push(`Delete${Entity}Command`);
    params.commands.push(`Update${Entity}Command`);
    params.querys.push(`Read${Entity}ByIdQuery`);
    if (Foreign) params.querys.push(`Read${Entity}By${Foreign}IdQuery`);

    params.functions.push(
      functionTemplate
        .replace(new RegExp('<optional>', 'g'), Foreign ? optional : '')
        .replace(new RegExp('<Entity>', 'g'), Entity)
        .replace(new RegExp('<entity>', 'g'), entity)
        .replace(new RegExp('<Foreign>', 'g'), Foreign)
        .replace(new RegExp('<foreign>', 'g'), foreign),
    );
  }

  const service = template
    .replace(new RegExp('<dto>', 'g'), params.dtos.join(', '))
    .replace(new RegExp('<entities>', 'g'), params.entities.join(', '))
    .replace(new RegExp('<command>', 'g'), params.commands.join(', '))
    .replace(new RegExp('<query>', 'g'), params.querys.join(', '))
    .replace(new RegExp('<functions>', 'g'), params.functions.join('\n'))
    .replace(new RegExp('<Path>', 'g'), Path);

  fs.writeFileSync(`src/endpoint/${path}/${path}.service.ts`, service);
};

execute(
  [{ Entity: 'Endpoint' }, { Entity: 'Param', Foreign: 'Endpoint' }],
  'Request',
);
