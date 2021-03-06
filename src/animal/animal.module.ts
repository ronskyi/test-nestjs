import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './domain/entities/animal.entity';
import { Owner } from './domain/entities/owner.entity';
import { Specie } from './domain/entities/specie.entity';
import { Pet } from './domain/entities/pet.entity';
import { WildAnimal } from './domain/entities/wild-aninal.entity';
import { repositoryProviders } from './infrastructure/repositories';
import { OwnerService } from './domain/services/owner.service';
import { OwnerController } from './resources/controllers/owner.controller';
import { AnimalDataTransformer } from './resources/transformers/animal-data.transformer';
import { AnimalService } from './domain/services/animal.service';
import { SpecieService } from './domain/services/specie.service';
import { AnimalController } from './resources/controllers/animal.controller';
import { SpecieController } from './resources/controllers/specie.controller';

const domainServices = [OwnerService, AnimalService, SpecieService];

@Module({
  imports: [TypeOrmModule.forFeature([Owner, Specie, Animal, Pet, WildAnimal])],
  controllers: [AnimalController, SpecieController, OwnerController],
  providers: [...repositoryProviders, ...domainServices, AnimalDataTransformer],
})
export class AnimalModule {}
