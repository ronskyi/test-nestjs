import { Owner } from '../../domain/entities/owner.entity';
import { AnimalResponse } from './animal.response';

export class PetResponse extends AnimalResponse {
  owner: Owner;
}
