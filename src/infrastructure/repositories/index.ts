import { IOwnerRepository } from '../../domain/repositories/owner.repository.interface';
import { OwnerGateway } from './owner.gateway';
import { ISpecieRepository } from '../../domain/repositories/specie.repository.interface';
import { IAnimalRepository } from '../../domain/repositories/animal.repository.interface';
import { AnimalGateway } from './animal.gateway';
import { SpecieGateway } from './specie.gateway';
import { IPetRepository } from '../../domain/repositories/pet.repository.interface';
import { PetGateway } from './pet.gateway';
import { IWildAnimalRepository } from '../../domain/repositories/wild-animal.repository.interface';
import { WildAnimalGateway } from './wild-animal.gateway';

export const repositoryProviders = [
  {
    provide: IOwnerRepository,
    useClass: OwnerGateway,
  },
  {
    provide: ISpecieRepository,
    useClass: SpecieGateway,
  },
  {
    provide: IAnimalRepository,
    useClass: AnimalGateway,
  },
  {
    provide: IPetRepository,
    useClass: PetGateway,
  },
  {
    provide: IWildAnimalRepository,
    useClass: WildAnimalGateway,
  },
];
