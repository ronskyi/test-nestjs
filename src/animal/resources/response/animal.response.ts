import { Specie } from '../../domain/entities/specie.entity';

export abstract class AnimalResponse {
  id: string;
  birthday: Date;
  specie: Specie;
  vaccinated: boolean;
  type: string;
}
