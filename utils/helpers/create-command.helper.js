var fs = require('fs');

const template = `
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { <entity> } from 'src/entity/<path>/<name>.entity';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { <entity>Dto } from '../dto/<name>.dto';

export class Create<entity>Command implements ICommand {
  constructor(public <name>: <entity>Dto) {}
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
    const { <name> } = command;

    <validations>

    const entity = this.repository.create(<name>);
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

execute('About', 'portfolio', {
  title: 'Título não informado',
  content: 'Conteúdo não informado',
});
execute('Education', 'portfolio', {
  school: 'Escola/Faculdade não informada',
  classroom: 'Curso não informado',
  image: 'Image não fornecida',
  nivel: 'Nível não informado',
  duration: 'Duração não informado',
  period: 'Período não informado',
  details: 'Detalhes não informado',
});
execute('Experience', 'portfolio', {
  company: 'Empresa não informada',
  role: 'Função/Cargo não informado',
  image: 'Imagem não fornecida',
  duration: 'Duração não informada',
  from: 'De não informado',
  to: 'Até não informado',
  details: 'Detalhes não informado',
});
execute('Portfolio', 'portfolio', {
  owner: 'Nome não informado',
  avatar: 'Avatar não fornecido',
});
execute('Skill', 'portfolio', {
  skill: 'Habilidade não informada',
  rating: 'Avaliação não informada',
});
