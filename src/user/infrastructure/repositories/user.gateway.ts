import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { ThrowsUniqueViolation } from '../../../@infrastructure/errors/throws-unique-violation.decorator';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';

export class UserGateway  implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  @ThrowsUniqueViolation
  saveEntity(entity: User): Promise<User> {
    return this.repository.save(entity);
  }
  findOneById(userId: string): Promise<User | undefined> {
    return this.repository.findOne(userId);
  }
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ where: { email: email } });
  }
}
