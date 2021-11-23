import { Injectable } from '@nestjs/common';
import { IOwnerRepository } from '../repositories/owner.repository.interface';
import { Owner } from '../entities/owner.entity';
import { validate } from 'class-validator';
import { DomainValidationError } from '../errors/domain-validation.error';
import { Pagination } from '../repositories/pagination';
import { ObjectNotFoundError } from '../errors/object-not-found.error';

@Injectable()
export class OwnerService {
  constructor(
    private readonly repo: IOwnerRepository
  ) {
  }

  async create(entity: Owner): Promise<Owner> {
    const errors = await validate(entity, {groups: ['create']});
    if (errors.length > 0) {
      throw new DomainValidationError(errors);
    }

    return this.repo.saveEntity(entity);
  }

  async update(entity: Owner): Promise<Owner> {
    const errors = await validate(entity, {groups: ['update']});
    if (errors.length > 0) {
      throw new DomainValidationError(errors);
    }

    return this.repo.saveEntity(entity);
  }

  async getById(id: string): Promise<Owner> {
    const entity = await this.repo.findOneById(id);
    if (!entity) {
      throw new ObjectNotFoundError();
    }

    return entity;
  }

  async getAll(pagination: Pagination): Promise<Owner[]> {
    return this.repo.findAll(pagination);
  }

  async countAll(): Promise<number> {
    return this.repo.countAll();
  }

  async deleteOwner(owner: Owner): Promise<void> {
    await this.repo.deleteEntity(owner)
  }
}
