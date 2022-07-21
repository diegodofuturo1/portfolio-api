var fs = require('fs');

const template = `
import { ApiTags } from '@nestjs/swagger';
import { <Endpoint>Service } from './<endpoint>.service';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { <entities> } from 'src/entity';
import { <dtos> } from './dto';

@ApiTags('<Endpoint>')
@Controller('<endpoint>')
export class <Endpoint>Controller {
  constructor(private readonly service: <Endpoint>Service) {}

  <functions>
}

`;

const functionsTemplate = `
  @Post('<entity>')
  async post<Entity>(@Body() body: <Entity>Dto) {
    return await this.service.create<Entity>(body);
  }

  @Get('<entity>/:id')
  async get<Entity>ById(@Param(':id') id: string) {
    return await this.service.read<Entity>byId(id);
  }
  <optional>
  @Put('<entity>/:id')
  async put<Entity>(
    @Param(':id') id: string,
    @Body() body: <Entity>Dto,
    @CurrentUser() user: User,
  ) {
    const <entity>: <Entity> = {
      id,
      ...body,
      userId: user.id,
    };
    return await this.service.update<Entity>(<entity>);
  }

  @Delete('<entity>/:id')
  async delete<Entity>(@Param(':id') id: string) {
    return await this.service.delete<Entity>(id);
  }
`;

const optional = `
@Get('<entity>')
async get<Entity>By<Foreign>Id(@Query(':<foreign>Id') <foreign>Id: string) {
  return await this.service.read<Entity>by<Foreign>Id(<foreign>Id);
}
`;

const execute = (entities, endpoint) => {
  const params = {
    dtos: [],
    entities: ['User'],
    functions: [],
  };

  for (const _entity of entities) {
    const { Entity, Foreign } = _entity;
    const entity = Entity.toLocaleLowerCase();
    const foreign = Foreign.toLocaleLowerCase();

    params.dtos.push(`${Entity}Dto`);
    params.entities.push(Entity);

    params.functions.push(
      functionsTemplate
        .replace(new RegExp('<optional>', 'g'), Foreign ? optional : '')
        .replace(new RegExp('<entity>', 'g'), entity)
        .replace(new RegExp('<Entity>', 'g'), Entity)
        .replace(new RegExp('<foreign>', 'g'), foreign)
        .replace(new RegExp('<Foreign>', 'g'), Foreign),
    );
  }
  const controller = template
    .replace(new RegExp('<dtos>', 'g'), params.dtos.join(', '))
    .replace(new RegExp('<entities>', 'g'), params.entities.join(', '))
    .replace(new RegExp('<endpoint>', 'g'), endpoint.toLocaleLowerCase())
    .replace(new RegExp('<Endpoint>', 'g'), endpoint)
    .replace(new RegExp('<functions>', 'g'), params.functions.join('\n'));

  fs.writeFileSync(
    `src/endpoint/${endpoint}/${endpoint}.auto-generated.controller.ts`,
    controller,
  );
};

execute(
  [
    { Entity: 'About', Foreign: 'Portfolio' },
    { Entity: 'Education', Foreign: 'Portfolio' },
    { Entity: 'Experience', Foreign: 'Portfolio' },
    { Entity: 'Portfolio', Foreign: '' },
    { Entity: 'Skill', Foreign: 'Experience' },
  ],
  'Portfolio',
);
