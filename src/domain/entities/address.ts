import { Column } from 'typeorm';

export class Address {
  @Column({ length: 50 })
  street: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 50 })
  country: string;

  @Column({ length: 10 })
  zipCode: string;
}
