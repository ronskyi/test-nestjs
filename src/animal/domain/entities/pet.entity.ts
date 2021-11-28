import { Animal } from './animal.entity';
import { Owner } from './owner.entity';
import { ChildEntity, ManyToOne } from 'typeorm';

@ChildEntity()
export class Pet extends Animal {
  constructor() {
    super();
  }

  @ManyToOne(() => Owner)
  owner: Owner;
}
