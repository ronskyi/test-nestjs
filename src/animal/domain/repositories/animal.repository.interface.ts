import { Pagination } from './pagination';
import { Animal } from '../entities/animal.entity';

export abstract class IAnimalRepository {
  abstract saveEntity(entity: Animal): Promise<Animal>;
  abstract findOneById(id: string): Promise<Animal | undefined>;
  abstract findAll(pagination: Pagination): Promise<Animal[]>;
  abstract countAll(): Promise<number>;
  abstract deleteEntity(entity: Animal): Promise<Animal>;
}
