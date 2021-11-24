import { Specie } from './specie.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Animal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  birthday: Date;

  @ManyToOne(() => Specie, { nullable: false })
  specie: Specie;

  @Column({ default: false })
  vaccinated: boolean;

  protected constructor() {
    this.vaccinated = false;
  }
}
