import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { DomainValidationError } from '../../../@domain/errors/domain-validation.error';
import { Pagination } from '../repositories/pagination';
import { ObjectNotFoundError } from '../../../@domain/errors/object-not-found.error';
import { IAnimalRepository } from '../repositories/animal.repository.interface';
import { Animal } from '../entities/animal.entity';
import { IWildAnimalRepository } from '../repositories/wild-animal.repository.interface';
import { IPetRepository } from '../repositories/pet.repository.interface';
import { Pet } from '../entities/pet.entity';
import { WildAnimal } from '../entities/wild-aninal.entity';

@Injectable()
export class AnimalService {
  constructor(
    private readonly repo: IAnimalRepository,
    private readonly petRepo: IPetRepository,
    private readonly waRepo: IWildAnimalRepository,
  ) {}

  async create(entity: Animal): Promise<Animal> {
    const errors = await validate(entity, { groups: ['create'] });
    if (errors.length > 0) {
      throw new DomainValidationError(errors);
    }

    switch (true) {
      case entity instanceof Pet:
        return this.petRepo.saveEntity(entity as Pet);
      case entity instanceof WildAnimal:
        return this.waRepo.saveEntity(entity as WildAnimal);
    }
  }

  async update(entity: Animal): Promise<Animal> {
    const errors = await validate(entity, { groups: ['update'] });
    if (errors.length > 0) {
      throw new DomainValidationError(errors);
    }

    return this.repo.saveEntity(entity);
  }

  async getById(id: string): Promise<Animal> {
    const animal = await this.repo.findOneById(id);
    if (!animal) {
      throw new ObjectNotFoundError();
    }

    return animal;
  }

  async getAll(pagination: Pagination): Promise<Animal[]> {
    return this.repo.findAll(pagination);
  }

  async countAll(): Promise<number> {
    return this.repo.countAll();
  }

  async deleteOwner(animal: Animal): Promise<void> {
    await this.repo.deleteEntity(animal);
  }
}
