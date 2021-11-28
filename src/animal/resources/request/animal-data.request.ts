import {
  IsBoolean,
  IsDate,
  IsIn,
  IsNotEmpty,
  IsUUID,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { Animal } from '../../domain/entities/animal.entity';
import { WildAnimal } from '../../domain/entities/wild-aninal.entity';
import { Pet } from '../../domain/entities/pet.entity';
import { Transform } from 'class-transformer';

export class AnimalDataRequest {
  @IsIn(['WildAnimal', 'Pet'])
  type: 'WildAnimal' | 'Pet';

  @IsDate()
  @Transform((p) => (p.value !== undefined ? new Date(p.value) : undefined))
  birthday: Date;

  @IsUUID()
  specieId: string;

  @IsBoolean()
  vaccinated: boolean;

  @ValidateIf((o) => o.type === 'Pet')
  @IsNotEmpty()
  @IsUUID()
  ownerId: string;

  @ValidateIf((o) => o.type === 'WildAnimal')
  @IsNotEmpty()
  @MaxLength(50)
  trackingId: string;

  createNewRequestedAnimal(): Animal {
    switch (this.type) {
      case 'Pet':
        return new Pet();
      case 'WildAnimal':
        return new WildAnimal();
    }
  }
}
