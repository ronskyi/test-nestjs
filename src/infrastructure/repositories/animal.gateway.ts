import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from '../../domain/repositories/pagination';
import { Repository } from 'typeorm';
import { Animal } from '../../domain/entities/animal.entity';
import { IAnimalRepository } from '../../domain/repositories/animal.repository.interface';

@Injectable()
export class AnimalGateway implements IAnimalRepository {
  constructor(
    @InjectRepository(Animal)
    private readonly repository: Repository<Animal>,
  ) {}

  saveEntity(entity: Animal): Promise<Animal> {
    return this.repository.save(entity);
  }

  findOneById(id: string): Promise<Animal | undefined> {
    return this.repository.findOne(
      { id },
      {
        relations: ['owner', 'specie'],
      },
    );
  }

  findAll(pagination: Pagination): Promise<Animal[]> {
    return this.repository.find({
      skip: pagination.offset,
      take: pagination.limit,
      relations: ['owner', 'specie'],
    });
  }

  countAll(): Promise<number> {
    return this.repository.count();
  }

  deleteEntity(entity: Animal): Promise<Animal> {
    return this.repository.remove(entity);
  }
}
