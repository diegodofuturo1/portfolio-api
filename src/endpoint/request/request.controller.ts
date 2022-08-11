import 'dotenv/config';
import { User } from 'src/entity';
import { ApiTags } from '@nestjs/swagger';
import { ParamDto, EndpointDto } from './dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { RequestService } from './request.service';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PublicGuard } from 'src/guard/public.guard';

@ApiTags('Request')
@Controller('request')
export class RequestController {
  constructor(private readonly service: RequestService) {}

  @UseGuards(AuthGuard)
  @Post('param')
  async postParam(@Body() body: ParamDto, @CurrentUser() user: User) {
    return await this.service.createParam(body, user.id);
  }

  @UseGuards(PublicGuard)
  @Get('param')
  async getParam(@CurrentUser() user: User) {
    return await this.service.readParam(user.id);
  }

  @UseGuards(PublicGuard)
  @Get('param/:id')
  async getParamById(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.service.readParambyId(id, user.id);
  }

  @UseGuards(PublicGuard)
  @Get('param/byEndpoint/:endpointId')
  async getParamByEndpointId(@Param('endpointId') endpointId: string, @CurrentUser() user: User) {
    return await this.service.readParambyEndpointId(endpointId, user.id);
  }

  @UseGuards(AuthGuard)
  @Put('param/:id')
  async putParam(@Param('id') id: string, @Body() body: ParamDto, @CurrentUser() user: User) {
    return await this.service.updateParam(id, body, user.id);
  }

  @UseGuards(AuthGuard)
  @Delete('param/:id')
  async deleteParam(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.service.deleteParam(id, user.id);
  }

  @UseGuards(AuthGuard)
  @Post('endpoint')
  async postEndpoint(@Body() body: EndpointDto, @CurrentUser() user: User) {
    return await this.service.createEndpoint(body, user.id);
  }

  @UseGuards(PublicGuard)
  @Get('endpoint')
  async getEndpoint(@CurrentUser() user: User) {
    return await this.service.readEndpoint(user.id);
  }

  @UseGuards(PublicGuard)
  @Get('endpoint/:id')
  async getEndpointById(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.service.readEndpointbyId(id, user.id);
  }

  @UseGuards(AuthGuard)
  @Put('endpoint/:id')
  async putEndpoint(@Param('id') id: string, @Body() body: EndpointDto, @CurrentUser() user: User) {
    return await this.service.updateEndpoint(id, body, user.id);
  }

  @UseGuards(AuthGuard)
  @Delete('endpoint/:id')
  async deleteEndpoint(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.service.deleteEndpoint(id, user.id);
  }
}
