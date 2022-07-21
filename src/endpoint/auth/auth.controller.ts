import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { HttpResponseDto as ResponseDto } from 'src/endpoint/auth/dto/response.dto';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from 'src/entity/user.entity';
import { AuthGuard } from 'src/guard/auth.guard';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/signup')
  async signup(@Body() body: SignUpDto, @Session() session: any) {
    const user = await this.service.signup(body);
    session.userId = user.id;

    return new ResponseDto()
      .setCode(201)
      .setData(user)
      .setMessage('Usuário criado com sucesso!')
      .send();
  }

  @Post('signin')
  async signin(@Body() body: SignInDto, @Session() session: any) {
    const user = await this.service.signin(body);
    session.userId = user.id;

    return new ResponseDto()
      .setCode(200)
      .setData(user)
      .setMessage('Usuário logado com sucesso!')
      .send();
  }

  @Post('signout')
  signout(@Session() session: any) {
    session.userId = null;

    return new ResponseDto()
      .setCode(200)
      .setMessage('Usuário deslogado com sucesso!')
      .send();
  }

  @UseGuards(AuthGuard)
  @Get('whoami')
  async whoami(@CurrentUser() user: User) {
    return new ResponseDto()
      .setCode(200)
      .setData(user)
      .setMessage('Usuário encontrado com sucesso!')
      .send();
  }
}
