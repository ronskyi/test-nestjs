import { WildAnimal } from '../entities/wild-aninal.entity';

export abstract class IWildAnimalRepository {
  abstract saveEntity(entity: WildAnimal): Promise<WildAnimal>;
}
