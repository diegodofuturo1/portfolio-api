var fs = require('fs');

const template = `
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
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
  UseGuards,
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
  @UseGuards(AuthGuard)
  @Post('<entity>')
  async post<Entity>(@Body() body: <Entity>Dto, @CurrentUser() user: User) {
    return await this.service.create<Entity>(body, user.id);
  }

  @UseGuards(AuthGuard)
  @Get('<entity>/:id')
  async get<Entity>ById(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.service.read<Entity>byId(id, user.id);
  }
  <optional>
  @UseGuards(AuthGuard)
  @Put('<entity>/:id')
  async put<Entity>(
    @Param('id') id: string,
    @Body() body: <Entity>Dto,
    @CurrentUser() user: User,
  ) {
    return await this.service.update<Entity>(id, body, user.id);
  }

  @UseGuards(AuthGuard)
  @Delete('<entity>/:id')
  async delete<Entity>(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.service.delete<Entity>(id, user.id);
  }
`;

const optional = `
@Get('<entity>')
async get<Entity>By<Foreign>Id(@Query(':<foreign>Id') <foreign>Id: string, @CurrentUser() user: User) {
  return await this.service.read<Entity>by<Foreign>Id(<foreign>Id, user.id);
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
    `src/endpoint/${endpoint}/${endpoint}.controller.ts`,
    controller,
  );
};

execute(
  [
    { Entity: 'Param', Foreign: 'Endpoint' },
    { Entity: 'Endpoint', Foreign: '' },
  ],
  'Request',
);
