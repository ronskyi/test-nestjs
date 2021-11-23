import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmFactory } from './factories/typeorm.factory';
import { Animal } from './domain/entities/animal.entity';
import { Owner } from './domain/entities/owner.entity';
import { Species } from './domain/entities/species.entity';
import { Pet } from './domain/entities/pet.entity';
import { WildAnimal } from './domain/entities/wild-aninal.entity';
import { IOwnerRepository } from './domain/repositories/owner.repository.interface';
import { OwnerGateway } from './infrastructure/repositories/owner-gateway.service';
import { OwnerService } from './domain/services/owner.service';
import { OwnerController } from './resources/controllers/owner.controller';

const repositories = [
  {
    provide: IOwnerRepository,
    useClass: OwnerGateway
  }
];

const domainServices = [
  OwnerService,
];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmFactory,
    }),
    TypeOrmModule.forFeature([Owner, Species, Animal, Pet, WildAnimal]),
  ],
  controllers: [OwnerController],
  providers: [
    ...repositories,
    ...domainServices,
  ],
})
export class AppModule {}
