import { Species } from './species.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Animal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  birthday: Date;

  @ManyToOne(() => Species, { nullable: false })
  species: Species;

  @Column({ default: false })
  vaccinated: boolean;

  protected constructor() {
    this.vaccinated = false;
  }
}
