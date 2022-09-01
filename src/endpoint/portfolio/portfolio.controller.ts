import { User } from 'src/entity';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { PortfolioService } from './portfolio.service';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AboutDto, EducationDto, ExperienceDto, PortfolioDto, SkillDto } from './dto';
import { PublicGuard } from 'src/guard/public.guard';

@ApiTags('Portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly service: PortfolioService) {}

  @UseGuards(AuthGuard)
  @Post('about')
  async postAbout(@Body() body: AboutDto, @CurrentUser() user: User) {
    return await this.service.createAbout(body, user.id);
  }

  @UseGuards(PublicGuard)
  @Get('about/:id')
  async getAboutById(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.service.readAboutbyId(id, user.id);
  }

  @UseGuards(PublicGuard)
  @Get('about')
  async getAboutByPortfolioId(
    @Query(':portfolioId') portfolioId: string,
    @CurrentUser() user: User,
  ) {
    return await this.service.readAboutbyPortfolioId(portfolioId, user.id);
  }

  @UseGuards(AuthGuard)
  @Put('about/:id')
  async putAbout(@Param('id') id: string, @Body() body: AboutDto, @CurrentUser() user: User) {
    return await this.service.updateAbout(id, body, user.id);
  }

  @UseGuards(AuthGuard)
  @Delete('about/:id')
  async deleteAbout(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.service.deleteAbout(id, user.id);
  }

  @UseGuards(AuthGuard)
  @Post('education')
  async postEducation(@Body() body: EducationDto, @CurrentUser() user: User) {
    return await this.service.createEducation(body, user.id);
  }

  @UseGuards(PublicGuard)
  @Get('education/:id')
  async getEducationById(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.service.readEducationbyId(id, user.id);
  }

  @UseGuards(PublicGuard)
  @Get('education')
  async getEducationByPortfolioId(
    @Query(':portfolioId') portfolioId: string,
    @CurrentUser() user: User,
  ) {
    return await this.service.readEducationbyPortfolioId(portfolioId, user.id);
  }

  @UseGuards(AuthGuard)
  @Put('education/:id')
  async putEducation(
    @Param('id') id: string,
    @Body() body: EducationDto,
    @CurrentUser() user: User,
  ) {
    return await this.service.updateEducation(id, body, user.id);
  }

  @UseGuards(AuthGuard)
  @Delete('education/:id')
  async deleteEducation(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.service.deleteEducation(id, user.id);
  }

  @UseGuards(AuthGuard)
  @Post('experience')
  async postExperience(@Body() body: ExperienceDto, @CurrentUser() user: User) {
    return await this.service.createExperience(body, user.id);
  }

  @UseGuards(PublicGuard)
  @Get('experience/:id')
  async getExperienceById(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.service.readExperiencebyId(id, user.id);
  }

  @UseGuards(PublicGuard)
  @Get('experience')
  async getExperienceByPortfolioId(
    @Query(':portfolioId') portfolioId: string,
    @CurrentUser() user: User,
  ) {
    return await this.service.readExperiencebyPortfolioId(portfolioId, user.id);
  }

  @UseGuards(AuthGuard)
  @Put('experience/:id')
  async putExperience(
    @Param('id') id: string,
    @Body() body: ExperienceDto,
    @CurrentUser() user: User,
  ) {
    return await this.service.updateExperience(id, body, user.id);
  }

  @UseGuards(AuthGuard)
  @Delete('experience/:id')
  async deleteExperience(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.service.deleteExperience(id, user.id);
  }

  @UseGuards(AuthGuard)
  @Post('skill')
  async postSkill(@Body() body: SkillDto, @CurrentUser() user: User) {
    return await this.service.createSkill(body, user.id);
  }

  @UseGuards(PublicGuard)
  @Get('skill/:id')
  async getSkillById(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.service.readSkillbyId(id, user.id);
  }

  @UseGuards(PublicGuard)
  @Get('skill')
  async getSkillByExperienceId(
    @Query(':experienceId') experienceId: string,
    @CurrentUser() user: User,
  ) {
    return await this.service.readSkillbyExperienceId(experienceId, user.id);
  }

  @UseGuards(AuthGuard)
  @Put('skill/:id')
  async putSkill(@Param('id') id: string, @Body() body: SkillDto, @CurrentUser() user: User) {
    return await this.service.updateSkill(id, body, user.id);
  }

  @UseGuards(AuthGuard)
  @Delete('skill/:id')
  async deleteSkill(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.service.deleteSkill(id, user.id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async postPortfolio(@Body() body: PortfolioDto, @CurrentUser() user: User) {
    return await this.service.createPortfolio(body, user.id);
  }

  @UseGuards(PublicGuard)
  @Get()
  async getPortfolio(@CurrentUser() user: User) {
    return await this.service.readPortfolio(user.id);
  }

  @UseGuards(PublicGuard)
  @Get('/:id')
  async getPortfolioById(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.service.readPortfoliobyId(id, user.id);
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  async putPortfolio(
    @Param('id') id: string,
    @Body() body: PortfolioDto,
    @CurrentUser() user: User,
  ) {
    return await this.service.updatePortfolio(id, body, user.id);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deletePortfolio(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.service.deletePortfolio(id, user.id);
  }
}
