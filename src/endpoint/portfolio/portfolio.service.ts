import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { About, Education, Experience, Portfolio, Skill } from 'src/entity';
import {
  AboutDto,
  EducationDto,
  ExperienceDto,
  PortfolioDto,
  SkillDto,
} from './dto';
import {
  ReadAboutByIdQuery,
  ReadAboutByPortfolioIdQuery,
  ReadEducationByIdQuery,
  ReadEducationByPortfolioIdQuery,
  ReadExperienceByIdQuery,
  ReadExperienceByPortfolioIdQuery,
  ReadPortfolioByIdQuery,
  ReadSkillByIdQuery,
  ReadSkillByExperienceIdQuery,
} from './query';
import {
  CreateAboutCommand,
  DeleteAboutCommand,
  UpdateAboutCommand,
  CreateEducationCommand,
  DeleteEducationCommand,
  UpdateEducationCommand,
  CreateExperienceCommand,
  DeleteExperienceCommand,
  UpdateExperienceCommand,
  CreatePortfolioCommand,
  DeletePortfolioCommand,
  UpdatePortfolioCommand,
  CreateSkillCommand,
  DeleteSkillCommand,
  UpdateSkillCommand,
} from './command';

@Injectable()
export class PortfolioService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createAbout(about: AboutDto): Promise<About> {
    return await this.commandBus.execute(new CreateAboutCommand(about));
  }

  async readAboutbyId(id: string): Promise<About> {
    return await this.queryBus.execute(new ReadAboutByIdQuery(id));
  }

  async readAboutbyPortfolioId(id: string): Promise<About> {
    return await this.queryBus.execute(new ReadAboutByPortfolioIdQuery(id));
  }

  async updateAbout(about: About): Promise<About> {
    const _about = await this.readAboutbyId(about.id);
    return await this.commandBus.execute(new UpdateAboutCommand(_about, about));
  }

  async deleteAbout(id: string): Promise<About> {
    const _about = await this.readAboutbyId(id);
    return await this.commandBus.execute(new DeleteAboutCommand(_about));
  }

  async createEducation(education: EducationDto): Promise<Education> {
    return await this.commandBus.execute(new CreateEducationCommand(education));
  }

  async readEducationbyId(id: string): Promise<Education> {
    return await this.queryBus.execute(new ReadEducationByIdQuery(id));
  }

  async readEducationbyPortfolioId(id: string): Promise<Education> {
    return await this.queryBus.execute(new ReadEducationByPortfolioIdQuery(id));
  }

  async updateEducation(education: Education): Promise<Education> {
    const _education = await this.readEducationbyId(education.id);
    return await this.commandBus.execute(
      new UpdateEducationCommand(_education, education),
    );
  }

  async deleteEducation(id: string): Promise<Education> {
    const _education = await this.readEducationbyId(id);
    return await this.commandBus.execute(
      new DeleteEducationCommand(_education),
    );
  }

  async createExperience(experience: ExperienceDto): Promise<Experience> {
    return await this.commandBus.execute(
      new CreateExperienceCommand(experience),
    );
  }

  async readExperiencebyId(id: string): Promise<Experience> {
    return await this.queryBus.execute(new ReadExperienceByIdQuery(id));
  }

  async readExperiencebyPortfolioId(id: string): Promise<Experience> {
    return await this.queryBus.execute(
      new ReadExperienceByPortfolioIdQuery(id),
    );
  }

  async updateExperience(experience: Experience): Promise<Experience> {
    const _experience = await this.readExperiencebyId(experience.id);
    return await this.commandBus.execute(
      new UpdateExperienceCommand(_experience, experience),
    );
  }

  async deleteExperience(id: string): Promise<Experience> {
    const _experience = await this.readExperiencebyId(id);
    return await this.commandBus.execute(
      new DeleteExperienceCommand(_experience),
    );
  }

  async createPortfolio(portfolio: PortfolioDto): Promise<Portfolio> {
    return await this.commandBus.execute(new CreatePortfolioCommand(portfolio));
  }

  async readPortfoliobyId(id: string): Promise<Portfolio> {
    return await this.queryBus.execute(new ReadPortfolioByIdQuery(id));
  }

  async updatePortfolio(portfolio: Portfolio): Promise<Portfolio> {
    const _portfolio = await this.readPortfoliobyId(portfolio.id);
    return await this.commandBus.execute(
      new UpdatePortfolioCommand(_portfolio, portfolio),
    );
  }

  async deletePortfolio(id: string): Promise<Portfolio> {
    const _portfolio = await this.readPortfoliobyId(id);
    return await this.commandBus.execute(
      new DeletePortfolioCommand(_portfolio),
    );
  }

  async createSkill(skill: SkillDto): Promise<Skill> {
    return await this.commandBus.execute(new CreateSkillCommand(skill));
  }

  async readSkillbyId(id: string): Promise<Skill> {
    return await this.queryBus.execute(new ReadSkillByIdQuery(id));
  }

  async readSkillbyExperienceId(id: string): Promise<Skill> {
    return await this.queryBus.execute(new ReadSkillByExperienceIdQuery(id));
  }

  async updateSkill(skill: Skill): Promise<Skill> {
    const _skill = await this.readSkillbyId(skill.id);
    return await this.commandBus.execute(new UpdateSkillCommand(_skill, skill));
  }

  async deleteSkill(id: string): Promise<Skill> {
    const _skill = await this.readSkillbyId(id);
    return await this.commandBus.execute(new DeleteSkillCommand(_skill));
  }
}
