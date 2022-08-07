import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/guard/admin.guard';
import { RequestService } from './request.service';
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
import { User } from 'src/entity';
import { ParamDto, EndpointDto } from './dto';

@UseGuards(AdminGuard)
@ApiTags('Request')
@Controller('request')
export class RequestController {
  constructor(private readonly service: RequestService) {}

  @Post('param')
  async postParam(@Body() body: ParamDto, @CurrentUser() user: User) {
    return await this.service.createParam(body, user.id);
  }

  @Get('param')
  async getParam(@CurrentUser() user: User) {
    return await this.service.readParam(user.id);
  }

  @Get('param/:id')
  async getParamById(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.service.readParambyId(id, user.id);
  }

  @Get('param/byEndpoint/:endpointId')
  async getParamByEndpointId(
    @Param(':endpointId') endpointId: string,
    @CurrentUser() user: User,
  ) {
    return await this.service.readParambyEndpointId(endpointId, user.id);
  }

  @Put('param/:id')
  async putParam(
    @Param('id') id: string,
    @Body() body: ParamDto,
    @CurrentUser() user: User,
  ) {
    return await this.service.updateParam(id, body, user.id);
  }

  @Delete('param/:id')
  async deleteParam(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.service.deleteParam(id, user.id);
  }

  @Post('endpoint')
  async postEndpoint(@Body() body: EndpointDto, @CurrentUser() user: User) {
    return await this.service.createEndpoint(body, user.id);
  }

  @Get('endpoint')
  async getEndpoint(@CurrentUser() user: User) {
    return await this.service.readEndpoint(user.id);
  }

  @Get('endpoint/:id')
  async getEndpointById(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.service.readEndpointbyId(id, user.id);
  }

  @Put('endpoint/:id')
  async putEndpoint(
    @Param('id') id: string,
    @Body() body: EndpointDto,
    @CurrentUser() user: User,
  ) {
    return await this.service.updateEndpoint(id, body, user.id);
  }

  @Delete('endpoint/:id')
  async deleteEndpoint(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.service.deleteEndpoint(id, user.id);
  }
}
