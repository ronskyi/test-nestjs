import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, unique: true })
  @Index({ unique: true })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column('varchar', { length: 20, array: true })
  roles: string[];

  @Column({ type: 'timestamp' })
  creationDate: Date;
}
