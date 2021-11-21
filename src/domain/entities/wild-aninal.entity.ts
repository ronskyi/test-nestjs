import { Animal } from './animal.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class WildAnimal extends Animal {
  @Column({ length: 50, nullable: true })
  trackingId: string;
}
