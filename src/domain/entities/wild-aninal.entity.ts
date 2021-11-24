import { Animal } from './animal.entity';
import { ChildEntity, Column } from 'typeorm';

@ChildEntity()
export class WildAnimal extends Animal {
  constructor() {
    super();
  }

  @Column({ length: 50 })
  trackingId: string;
}
