import { Animal } from './animal.entity';
import { Owner } from './owner.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class Pet extends Animal {
  @ManyToOne(() => Owner, { nullable: true })
  owner: Owner;
}
