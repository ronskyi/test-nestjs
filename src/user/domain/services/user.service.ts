import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { DomainValidationError } from '../../../@domain/errors/domain-validation.error';
import { ObjectDuplicatedError } from '../../../@domain/errors/object-duplicated.error';
import { ObjectNotFoundError } from '../../../@domain/errors/object-not-found.error';
import { UniqueViolationError } from '../../../@infrastructure/errors/unique-violation.error';
import { IUserRepository } from '../repositories/user.repository.interface';

@Injectable()
export class UserService {
  constructor(private userRepository: IUserRepository) {}

  public async create(user: User): Promise<User> {
    user.creationDate = new Date();
    user.password = await bcrypt.hash(user.password, 10);

    const errors = await validate(user, { groups: ['createUser'] });
    if (errors.length > 0) {
      throw new DomainValidationError(errors);
    }
    try {
      user = await this.userRepository.saveEntity(user);
    } catch (error) {
      if (error instanceof UniqueViolationError) {
        throw new ObjectDuplicatedError('The email is already registered');
      }
    }
    return user;
  }

  public async login(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  public async getById(id: string): Promise<User> {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new ObjectNotFoundError();
    }
    return user;
  }
}
