import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { DomainValidationError } from '../errors/domain-validation.error';
import { Pagination } from '../repositories/pagination';
import { ObjectNotFoundError } from '../errors/object-not-found.error';
import { ISpecieRepository } from '../repositories/specie.repository.interface';
import { Specie } from '../entities/specie.entity';
import { SpecieSearchQuery } from '../queries/specie-search.query';

@Injectable()
export class SpecieService {
  constructor(private readonly repo: ISpecieRepository) {}

  async create(entity: Specie): Promise<Specie> {
    const errors = await validate(entity, { groups: ['create'] });
    if (errors.length > 0) {
      throw new DomainValidationError(errors);
    }

    return this.repo.saveEntity(entity);
  }

  async update(entity: Specie): Promise<Specie> {
    const errors = await validate(entity, { groups: ['update'] });
    if (errors.length > 0) {
      throw new DomainValidationError(errors);
    }

    return this.repo.saveEntity(entity);
  }

  async getById(id: string): Promise<Specie> {
    const entity = await this.repo.findOneById(id);
    if (!entity) {
      throw new ObjectNotFoundError();
    }

    return entity;
  }

  async getAll(
    query: SpecieSearchQuery,
    pagination: Pagination,
  ): Promise<Specie[]> {
    return this.repo.findBySearchQuery(query, pagination);
  }

  async countAll(query: SpecieSearchQuery): Promise<number> {
    return this.repo.countBySearchQuery(query);
  }

  async deleteOwner(owner: Specie): Promise<void> {
    await this.repo.deleteEntity(owner);
  }
}
