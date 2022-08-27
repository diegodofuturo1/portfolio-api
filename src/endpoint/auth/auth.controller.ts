import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { PublicGuard } from 'src/guard/public.guard';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { HttpResponseDto } from 'src/endpoint/auth/dto/response.dto';
import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { UserPreferencesDto } from './dto/user-change.dto';
import { User } from 'src/entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @UseGuards(PublicGuard)
  @Post('/signup')
  async signup(@Body() body: SignUpDto) {
    const user = await this.service.signup(body);

    return new HttpResponseDto()
      .setCode(201)
      .setData(user)
      .setMessage('Usuário criado com sucesso!')
      .send();
  }

  @UseGuards(PublicGuard)
  @Post('signin')
  async signin(@Body() body: SignInDto) {
    const user = await this.service.signin(body);

    return new HttpResponseDto()
      .setCode(200)
      .setData(user)
      .setMessage('Usuário logado com sucesso!')
      .send();
  }

  @UseGuards(AuthGuard)
  @Post('signout')
  signout() {
    return new HttpResponseDto().setCode(200).setMessage('Usuário deslogado com sucesso!').send();
  }

  @UseGuards(AuthGuard)
  @Get('whoami')
  async whoami(@CurrentUser() currentUser: CurrentUser) {
    try {
      const user = await this.service.whoami(currentUser);

      return new HttpResponseDto()
        .setCode(200)
        .setData(user)
        .setMessage('Usuário encontrado com sucesso!')
        .send();
    } catch {
      return new HttpResponseDto().setCode(200).setMessage('Nenhum usuário logado!').send();
    }
  }

  @UseGuards(AuthGuard)
  @Put(`preferences`)
  async userPreferencesChange(@Body() body: UserPreferencesDto, @CurrentUser() user: CurrentUser) {
    return await this.service.updateUserPreferences(body, user.sub);
  }
}
