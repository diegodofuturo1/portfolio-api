import { ApiTags } from '@nestjs/swagger';
import { PortfolioService } from './portfolio.service';
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
import {
  User,
  About,
  Education,
  Experience,
  Portfolio,
  Skill,
} from 'src/entity';
import {
  AboutDto,
  EducationDto,
  ExperienceDto,
  PortfolioDto,
  SkillDto,
} from './dto';

@ApiTags('Portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly service: PortfolioService) {}

  @Post('about')
  async postAbout(@Body() body: AboutDto) {
    return await this.service.createAbout(body);
  }

  @Get('about/:id')
  async getAboutById(@Param(':id') id: string) {
    return await this.service.readAboutbyId(id);
  }

  @Get('about')
  async getAboutByPortfolioId(@Query(':portfolioId') portfolioId: string) {
    return await this.service.readAboutbyPortfolioId(portfolioId);
  }

  @Put('about/:id')
  async putAbout(
    @Param(':id') id: string,
    @Body() body: AboutDto,
    @CurrentUser() user: User,
  ) {
    const about: About = {
      id,
      ...body,
      userId: user.id,
    };
    return await this.service.updateAbout(about);
  }

  @Delete('about/:id')
  async deleteAbout(@Param(':id') id: string) {
    return await this.service.deleteAbout(id);
  }

  @Post('education')
  async postEducation(@Body() body: EducationDto) {
    return await this.service.createEducation(body);
  }

  @Get('education/:id')
  async getEducationById(@Param(':id') id: string) {
    return await this.service.readEducationbyId(id);
  }

  @Get('education')
  async getEducationByPortfolioId(@Query(':portfolioId') portfolioId: string) {
    return await this.service.readEducationbyPortfolioId(portfolioId);
  }

  @Put('education/:id')
  async putEducation(
    @Param(':id') id: string,
    @Body() body: EducationDto,
    @CurrentUser() user: User,
  ) {
    const education: Education = {
      id,
      ...body,
      userId: user.id,
    };
    return await this.service.updateEducation(education);
  }

  @Delete('education/:id')
  async deleteEducation(@Param(':id') id: string) {
    return await this.service.deleteEducation(id);
  }

  @Post('experience')
  async postExperience(@Body() body: ExperienceDto) {
    return await this.service.createExperience(body);
  }

  @Get('experience/:id')
  async getExperienceById(@Param(':id') id: string) {
    return await this.service.readExperiencebyId(id);
  }

  @Get('experience')
  async getExperienceByPortfolioId(@Query(':portfolioId') portfolioId: string) {
    return await this.service.readExperiencebyPortfolioId(portfolioId);
  }

  @Put('experience/:id')
  async putExperience(
    @Param(':id') id: string,
    @Body() body: ExperienceDto,
    @CurrentUser() user: User,
  ) {
    const experience: Experience = {
      id,
      ...body,
      userId: user.id,
    };
    return await this.service.updateExperience(experience);
  }

  @Delete('experience/:id')
  async deleteExperience(@Param(':id') id: string) {
    return await this.service.deleteExperience(id);
  }

  @Post()
  async postPortfolio(@Body() body: PortfolioDto) {
    return await this.service.createPortfolio(body);
  }

  @Get('/:id')
  async getPortfolioById(@Param(':id') id: string) {
    return await this.service.readPortfoliobyId(id);
  }

  @Put('/:id')
  async putPortfolio(
    @Param(':id') id: string,
    @Body() body: PortfolioDto,
    @CurrentUser() user: User,
  ) {
    const portfolio: Portfolio = {
      id,
      ...body,
      userId: user.id,
    };
    return await this.service.updatePortfolio(portfolio);
  }

  @Delete('/:id')
  async deletePortfolio(@Param(':id') id: string) {
    return await this.service.deletePortfolio(id);
  }

  @Post('skill')
  async postSkill(@Body() body: SkillDto) {
    return await this.service.createSkill(body);
  }

  @Get('skill/:id')
  async getSkillById(@Param(':id') id: string) {
    return await this.service.readSkillbyId(id);
  }

  @Get('skill')
  async getSkillByExperienceId(@Query(':experienceId') experienceId: string) {
    return await this.service.readSkillbyExperienceId(experienceId);
  }

  @Put('skill/:id')
  async putSkill(
    @Param(':id') id: string,
    @Body() body: SkillDto,
    @CurrentUser() user: User,
  ) {
    const skill: Skill = {
      id,
      ...body,
      userId: user.id,
    };
    return await this.service.updateSkill(skill);
  }

  @Delete('skill/:id')
  async deleteSkill(@Param(':id') id: string) {
    return await this.service.deleteSkill(id);
  }
}
