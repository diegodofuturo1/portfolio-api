
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { About, Education, Experience, Portfolio, Skill } from 'src/entity';
import { AboutDto, EducationDto, ExperienceDto, PortfolioDto, SkillDto } from './dto';
import { ReadAboutByIdQuery, ReadAboutByPortfolioIdQuery, ReadEducationByIdQuery, ReadEducationByPortfolioIdQuery, ReadExperienceByIdQuery, ReadExperienceByPortfolioIdQuery, ReadPortfolioByIdQuery, ReadSkillByIdQuery, ReadSkillByExperienceIdQuery } from './query';
import { CreateAboutCommand, DeleteAboutCommand, UpdateAboutCommand, CreateEducationCommand, DeleteEducationCommand, UpdateEducationCommand, CreateExperienceCommand, DeleteExperienceCommand, UpdateExperienceCommand, CreatePortfolioCommand, DeletePortfolioCommand, UpdatePortfolioCommand, CreateSkillCommand, DeleteSkillCommand, UpdateSkillCommand } from './command';

@Injectable()
export class PortfolioService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  
async createAbout(about: AboutDto, userId: string): Promise<About> {
  return await this.commandBus.execute(new CreateAboutCommand(about, userId));
}

async readAboutbyId(id: string, userId: string): Promise<About> {
  return await this.queryBus.execute(new ReadAboutByIdQuery(id, userId));
}

async readAboutbyPortfolioId(id: string, userId: string): Promise<About> {
  return await this.queryBus.execute(new ReadAboutByPortfolioIdQuery(id, userId));
}

async updateAbout(id: string, about: AboutDto, userId: string): Promise<About> {
  const _about = await this.readAboutbyId(id, userId);
  return await this.commandBus.execute(new UpdateAboutCommand(_about, { ...about, id, userId }));
}

async deleteAbout(id: string, userId: string): Promise<About> {
  const _about = await this.readAboutbyId(id, userId);
  return await this.commandBus.execute(new DeleteAboutCommand(_about));
}

async createEducation(education: EducationDto, userId: string): Promise<Education> {
  return await this.commandBus.execute(new CreateEducationCommand(education, userId));
}

async readEducationbyId(id: string, userId: string): Promise<Education> {
  return await this.queryBus.execute(new ReadEducationByIdQuery(id, userId));
}

async readEducationbyPortfolioId(id: string, userId: string): Promise<Education> {
  return await this.queryBus.execute(new ReadEducationByPortfolioIdQuery(id, userId));
}

async updateEducation(id: string, education: EducationDto, userId: string): Promise<Education> {
  const _education = await this.readEducationbyId(id, userId);
  return await this.commandBus.execute(new UpdateEducationCommand(_education, { ...education, id, userId }));
}

async deleteEducation(id: string, userId: string): Promise<Education> {
  const _education = await this.readEducationbyId(id, userId);
  return await this.commandBus.execute(new DeleteEducationCommand(_education));
}

async createExperience(experience: ExperienceDto, userId: string): Promise<Experience> {
  return await this.commandBus.execute(new CreateExperienceCommand(experience, userId));
}

async readExperiencebyId(id: string, userId: string): Promise<Experience> {
  return await this.queryBus.execute(new ReadExperienceByIdQuery(id, userId));
}

async readExperiencebyPortfolioId(id: string, userId: string): Promise<Experience> {
  return await this.queryBus.execute(new ReadExperienceByPortfolioIdQuery(id, userId));
}

async updateExperience(id: string, experience: ExperienceDto, userId: string): Promise<Experience> {
  const _experience = await this.readExperiencebyId(id, userId);
  return await this.commandBus.execute(new UpdateExperienceCommand(_experience, { ...experience, id, userId }));
}

async deleteExperience(id: string, userId: string): Promise<Experience> {
  const _experience = await this.readExperiencebyId(id, userId);
  return await this.commandBus.execute(new DeleteExperienceCommand(_experience));
}

async createPortfolio(portfolio: PortfolioDto, userId: string): Promise<Portfolio> {
  return await this.commandBus.execute(new CreatePortfolioCommand(portfolio, userId));
}

async readPortfoliobyId(id: string, userId: string): Promise<Portfolio> {
  return await this.queryBus.execute(new ReadPortfolioByIdQuery(id, userId));
}

async updatePortfolio(id: string, portfolio: PortfolioDto, userId: string): Promise<Portfolio> {
  const _portfolio = await this.readPortfoliobyId(id, userId);
  return await this.commandBus.execute(new UpdatePortfolioCommand(_portfolio, { ...portfolio, id, userId }));
}

async deletePortfolio(id: string, userId: string): Promise<Portfolio> {
  const _portfolio = await this.readPortfoliobyId(id, userId);
  return await this.commandBus.execute(new DeletePortfolioCommand(_portfolio));
}

async createSkill(skill: SkillDto, userId: string): Promise<Skill> {
  return await this.commandBus.execute(new CreateSkillCommand(skill, userId));
}

async readSkillbyId(id: string, userId: string): Promise<Skill> {
  return await this.queryBus.execute(new ReadSkillByIdQuery(id, userId));
}

async readSkillbyExperienceId(id: string, userId: string): Promise<Skill> {
  return await this.queryBus.execute(new ReadSkillByExperienceIdQuery(id, userId));
}

async updateSkill(id: string, skill: SkillDto, userId: string): Promise<Skill> {
  const _skill = await this.readSkillbyId(id, userId);
  return await this.commandBus.execute(new UpdateSkillCommand(_skill, { ...skill, id, userId }));
}

async deleteSkill(id: string, userId: string): Promise<Skill> {
  const _skill = await this.readSkillbyId(id, userId);
  return await this.commandBus.execute(new DeleteSkillCommand(_skill));
}
}
