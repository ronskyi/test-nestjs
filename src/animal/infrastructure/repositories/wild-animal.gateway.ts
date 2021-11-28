import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WildAnimal } from '../../domain/entities/wild-aninal.entity';
import { IWildAnimalRepository } from '../../domain/repositories/wild-animal.repository.interface';

@Injectable()
export class WildAnimalGateway implements IWildAnimalRepository {
  constructor(
    @InjectRepository(WildAnimal)
    private readonly repository: Repository<WildAnimal>,
  ) {}

  saveEntity(entity: WildAnimal): Promise<WildAnimal> {
    return this.repository.save(entity);
  }
}
