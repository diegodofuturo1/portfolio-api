var fs = require('fs');

const template = `
import Querys from './query';
import Commands from './command';
import Entity from '../../entity';
import { Module } from '@nestjs/common';
import { <Endpoint>Service } from './<endpoint>.service';
import { <Endpoint>Controller } from './<endpoint>.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature(Entity)],
  controllers: [<Endpoint>Controller],
  providers: [<Endpoint>Service, ...Querys, ...Commands],
  exports: [<Endpoint>Service],
})
export class <Endpoint>Module {}

`;

const execute = (Endpoint) => {
  const endpoint = Endpoint.toLocaleLowerCase();

  const module = template
    .replace(new RegExp('<endpoint>', 'g'), endpoint)
    .replace(new RegExp('<Endpoint>', 'g'), Endpoint);

  fs.writeFileSync(`src/endpoint/${endpoint}/${endpoint}.module.ts`, module);
};

execute('Request');
