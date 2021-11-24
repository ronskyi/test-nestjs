import { Pet } from '../entities/pet.entity';

export abstract class IPetRepository {
  abstract saveEntity(entity: Pet): Promise<Pet>;
}
