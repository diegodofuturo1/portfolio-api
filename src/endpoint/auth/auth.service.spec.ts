import 'dotenv/config';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { User } from 'src/entity';
import { IUserService } from 'src/interfaces/user.interface';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { UserPreferencesDto } from './dto/user-change.dto';
import { CurrentUser } from 'src/decorator/current-user.decorator';

export class UserServiceTest implements IUserService {
  private readonly repository: User[] = [];
  private readonly defaultUser: User = {
    avatar: '',
    email: '',
    id: '1',
    name: '',
    password: '',
    theme: 'cyan',
  };

  getUserById = async (id: string) => {
    return Promise.resolve(this.repository.find((user) => user.id === id));
  };
  getUserByEmail = async (email: string) => {
    const user = this.repository.find((user) => user.email === email);
    if (!user) return Promise.reject();
    return Promise.resolve(user);
  };
  createUser = async (user: SignUpDto) => {
    return Promise.resolve(
      this.repository[this.repository.push({ ...this.defaultUser, ...user }) - 1],
    );
  };
  deleteUserByEmail = async (email: string, userId: string) => {
    return Promise.resolve(
      this.repository.splice(
        this.repository.indexOf(this.repository.find((user) => user.email == email)),
      )[0],
    );
  };
  updatePreferencesUser = async (preferences: UserPreferencesDto, userId: string) => {
    return Promise.resolve();
  };
}

const jwtOptions = { secret: process.env.SECRET, signOptions: { expiresIn: `3600s` } };

describe('AuthService', () => {
  let service: AuthService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [JwtModule.register(jwtOptions)],
      providers: [AuthService, { provide: UserService, useClass: UserServiceTest }],
    }).compile();

    service = module.get(AuthService);
  });

  it('auth service instance', async () => {
    expect(service).toBeDefined();
  });

  it('try create a new user', async () => {
    const user = await service.signup({
      name: 'Test',
      password: 'test@123',
      email: 'teste@test.com',
    });

    expect(user).toBeDefined();
    expect(user.name).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user['password']).not.toBeDefined();
  });

  it('try login with a user', async () => {
    const user = await service.signin({
      password: 'test@123',
      email: 'teste@test.com',
    });

    expect(user).toBeDefined();
    expect(user.name).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user['password']).not.toBeDefined();
  });

  it('try get a logged user', async () => {
    const user = await service.whoami({
      email: 'test@test.com',
      sub: '1',
      exp: 0,
      iat: 0,
      token: '',
    });

    expect(user).toBeDefined();
    expect(user.name).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user['password']).not.toBeDefined();
  });
});
