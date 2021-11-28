import { OwnerService } from '../../domain/services/owner.service';
import { SpecieService } from '../../domain/services/specie.service';
import { Animal } from '../../domain/entities/animal.entity';
import { AnimalDataRequest } from '../request/animal-data.request';
import { Pet } from '../../domain/entities/pet.entity';
import { WildAnimal } from '../../domain/entities/wild-aninal.entity';
import { ObjectNotFoundError } from '../../../@domain/errors/object-not-found.error';
import { ReferenceNotFoundError } from '../../../@domain/errors/reference-not-found.error';
import { Owner } from '../../domain/entities/owner.entity';
import { Specie } from '../../domain/entities/specie.entity';
import { Injectable } from '@nestjs/common';
import { AnimalResponse } from '../response/animal.response';
import { PetResponse } from '../response/pet.response';
import { WildAnimalResponse } from '../response/wild-animal.response';

@Injectable()
export class AnimalDataTransformer {
  constructor(
    private readonly ownerService: OwnerService,
    private readonly specieService: SpecieService,
  ) {}

  async toEntity(animal: Animal, data: AnimalDataRequest): Promise<Animal> {
    animal.birthday = data.birthday;
    animal.vaccinated = data.vaccinated;
    animal.specie = await this.getSpecie(data.specieId);

    if (animal instanceof Pet && data.type === 'Pet') {
      animal.owner = await this.getOwner(data.ownerId);
    }
    if (animal instanceof WildAnimal && data.type === 'WildAnimal') {
      animal.trackingId = data.trackingId;
    }

    return animal;
  }

  toResponse(animal: Animal): AnimalResponse {
    let response;
    if (animal instanceof Pet) {
      response = new PetResponse();
      response.owner = animal.owner;
      response.type = 'Pet';
    } else if (animal instanceof WildAnimal) {
      response = new WildAnimalResponse();
      response.trackingId = animal.trackingId;
      response.type = 'WildAnimal';
    }

    response.id = animal.id;
    response.birthday = animal.birthday;
    response.specie = animal.specie;
    response.vaccinated = animal.vaccinated;
    return response;
  }

  private async getSpecie(specieId): Promise<Specie> {
    try {
      return this.specieService.getById(specieId);
    } catch (e) {
      if (e instanceof ObjectNotFoundError) {
        throw new ReferenceNotFoundError();
      }
      throw e;
    }
  }

  private async getOwner(ownerId): Promise<Owner> {
    try {
      return this.ownerService.getById(ownerId);
    } catch (e) {
      if (e instanceof ObjectNotFoundError) {
        throw new ReferenceNotFoundError();
      }
      throw e;
    }
  }
}
