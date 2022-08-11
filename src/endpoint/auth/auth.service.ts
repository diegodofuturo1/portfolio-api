import { promisify } from 'util';
import { UserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from 'src/entity/user.entity';
import { UserService } from '../users/user.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private users: UserService, private jwt: JwtService) {}

  async emailIsAvailable(email: string) {
    try {
      await this.users.getUserByEmail(email);
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

  async dencriptPassword(user: User, password: string) {
    const [salt, hash] = user.password.split('.');

    const promise = await scrypt(password, salt, 32);
    const decrypted = promise as Buffer;

    if (decrypted.toString('hex') != hash) throw new BadRequestException('Senha inválida!');

    return decrypted;
  }

  signToken(user: User) {
    return this.jwt.sign({ sub: user.id, email: user.email });
  }

  verifyToken(token: string) {
    return this.jwt.verify(token);
  }

  decodeToken(token: string) {
    return this.jwt.decode(token) as User;
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
      token: this.signToken(user),
    };
  }

  async signin(request: SignInDto): Promise<UserDto> {
    const { email, password } = request;

    const user: User = await this.users.getUserByEmail(email);

    if (!user) throw new NotFoundException('usuário não encontrado!');

    this.dencriptPassword(user, password);

    return {
      email: user.email,
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      token: this.jwt.sign({ sub: user.id, email: user.email }),
    };
  }

  async whoami(id: string) {
    return await this.users.getUserById(id);
  }
}
