import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { Skill } from 'src/entity/portfolio/skill.entity';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { alphanumericSorter } from 'utils/order';

export class ReadSkillByExperienceIdQuery implements IQuery {
  constructor(public readonly experienceId: string, public userId: string) {}
}

@QueryHandler(ReadSkillByExperienceIdQuery)
export class ReadSkillByExperienceIdQueryHandler
  implements IQueryHandler<ReadSkillByExperienceIdQuery>
{
  constructor(
    @InjectRepository(Skill)
    private readonly repository: Repository<Skill>,
  ) {}

  async execute(query: ReadSkillByExperienceIdQuery): Promise<Skill[]> {
    const { experienceId, userId } = query;

    if (!experienceId) throw new BadRequestException('Id não informado');

    const skill = await this.repository.find({ where: { experienceId, userId } });

    return skill.sort(alphanumericSorter);
  }
}
