import { Module } from '@nestjs/common';
import { AppController } from './resources/controllers/app.controller';
import { AppService } from './domain/services/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmFactory } from './factories/typeorm.factory';
import { Animal } from './domain/entities/animal.entity';
import { Owner } from './domain/entities/owner.entity';
import { Species } from './domain/entities/species.entity';
import { Pet } from './domain/entities/pet.entity';
import { WildAnimal } from './domain/entities/wild-aninal.entity';

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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
