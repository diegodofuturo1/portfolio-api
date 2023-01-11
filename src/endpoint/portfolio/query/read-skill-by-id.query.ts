import { Repository } from 'typeorm';
import { Skill } from 'src/entity/portfolio/skill.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class ReadSkillByIdQuery implements IQuery {
  constructor(public readonly id: string, public userId: string) {}
}

@QueryHandler(ReadSkillByIdQuery)
export class ReadSkillByIdQueryHandler implements IQueryHandler<ReadSkillByIdQuery> {
  constructor(
    @InjectRepository(Skill)
    private readonly repository: Repository<Skill>,
  ) {}

  async execute(query: ReadSkillByIdQuery): Promise<any> {
    const { id, userId } = query;

    if (!id) throw new BadRequestException('Id não informado');

    const skill = await this.repository.findOne({ where: { id, userId } });

    if (!skill) throw new NotFoundException('Biografia não encontrada');

    return skill;
  }
}
