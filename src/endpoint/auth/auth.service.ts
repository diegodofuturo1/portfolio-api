import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { UserService } from '../users/user.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from 'src/entity/user.entity';
import { SignInDto } from './dto/signin.dto';
import { UserDto } from './dto/user.dto';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private users: UserService) {}

  async emailIsAvailable(email: string) {
    try {
      const user = await this.users.getUserByEmail(email);
      console.log('[USER]', user);
      return false;
    } catch (exception) {
      return true;
    }
  }

  async encriptPassword(password: string) {
    const salt = randomBytes(8).toString('hex');
    const promise = await scrypt(password, salt, 32);
    const hash = promise as Buffer;
    const encript = `${salt}.${hash.toString('hex')}`;
    return encript;
  }

  async signup(request: SignUpDto): Promise<UserDto> {
    const { email, password, name } = request;

    const available = await this.emailIsAvailable(email);

    if (!available) throw new BadRequestException('Email já registrado');

    const encripted = await this.encriptPassword(password);

    const user: User = await this.users.createUser({
      email,
      name,
      password: encripted,
    });

    return {
      email: user.email,
      id: user.id,
      name: user.name,
      avatar: user.avatar,
    };
  }

  async signin(request: SignInDto): Promise<UserDto> {
    const { email, password } = request;

    const user: User = await this.users.getUserByEmail(email);

    if (!user) throw new NotFoundException('usuário não encontrado!');

    const [salt, hash] = user.password.split('.');

    const promise = await scrypt(password, salt, 32);
    const decrypted = promise as Buffer;

    if (decrypted.toString('hex') != hash)
      throw new BadRequestException('Senha inválida!');

    return {
      email: user.email,
      id: user.id,
      name: user.name,
      avatar: user.avatar,
    };
  }

  async whoami(id: string) {
    return await this.users.getUserById(id);
  }
}
