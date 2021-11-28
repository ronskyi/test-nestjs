import { User } from '../entities/user.entity';

export abstract class IUserRepository  {
  abstract saveEntity(entity: User): Promise<User>;
  abstract findOneById(userId: string): Promise<User | undefined>;
  abstract  findOneByEmail(email: string): Promise<User | undefined>;
}