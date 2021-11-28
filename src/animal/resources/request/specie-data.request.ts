import { Length } from 'class-validator';
import { Specie } from '../../domain/entities/specie.entity';

export class SpecieDataRequest {
  @Length(0, 50)
  label: string;

  toEntity(specie: Specie): Specie {
    specie.label = this.label;
    return specie;
  }
}
