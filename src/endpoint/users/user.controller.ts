import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/entity/user.entity';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.service.getUserById(id);
  }

  @Post()
  async postUser(@Body() body: User) {
    return await this.service.createUser(body);
  }
}
