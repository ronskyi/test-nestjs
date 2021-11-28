import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPetRepository } from '../../domain/repositories/pet.repository.interface';
import { Pet } from '../../domain/entities/pet.entity';

@Injectable()
export class PetGateway implements IPetRepository {
  constructor(
    @InjectRepository(Pet)
    private readonly repository: Repository<Pet>,
  ) {}

  saveEntity(entity: Pet): Promise<Pet> {
    return this.repository.save(entity);
  }
}
