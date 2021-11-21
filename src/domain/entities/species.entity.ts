import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Species {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  label: string;
}
