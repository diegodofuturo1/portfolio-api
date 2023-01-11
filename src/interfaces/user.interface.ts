import { User } from 'src/entity';
import { SignUpDto } from 'src/endpoint/auth/dto/signup.dto';
import { UserPreferencesDto } from 'src/endpoint/auth/dto/user-change.dto';

export interface IUserService {
  getUserById: (id: string) => Promise<User>;
  getUserByEmail: (email: string) => Promise<User>;
  createUser: (user: SignUpDto) => Promise<User>;
  deleteUserByEmail: (email: string, userId: string) => Promise<User>;
  updatePreferencesUser: (preferences: UserPreferencesDto, userId: string) => Promise<void>;
}
