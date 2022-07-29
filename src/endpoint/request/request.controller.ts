import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
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

@ApiTags('Request')
@Controller('request')
export class RequestController {
  constructor(private readonly service: RequestService) {}

  @UseGuards(AuthGuard)
  @Post('param')
  async postParam(@Body() body: ParamDto, @CurrentUser() user: User) {
    return await this.service.createParam(body, user.id);
  }

  @UseGuards(AuthGuard)
  @Get('param/:id')
  async getParamById(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.service.readParambyId(id, user.id);
  }

  @Get('param')
  async getParamByEndpointId(
    @Query(':endpointId') endpointId: string,
    @CurrentUser() user: User,
  ) {
    return await this.service.readParambyEndpointId(endpointId, user.id);
  }

  @UseGuards(AuthGuard)
  @Put('param/:id')
  async putParam(
    @Param('id') id: string,
    @Body() body: ParamDto,
    @CurrentUser() user: User,
  ) {
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

  @UseGuards(AuthGuard)
  @Get('endpoint/:id')
  async getEndpointById(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.service.readEndpointbyId(id, user.id);
  }

  @UseGuards(AuthGuard)
  @Put('endpoint/:id')
  async putEndpoint(
    @Param('id') id: string,
    @Body() body: EndpointDto,
    @CurrentUser() user: User,
  ) {
    return await this.service.updateEndpoint(id, body, user.id);
  }

  @UseGuards(AuthGuard)
  @Delete('endpoint/:id')
  async deleteEndpoint(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.service.deleteEndpoint(id, user.id);
  }
}
