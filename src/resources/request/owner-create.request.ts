import { Length } from 'class-validator';
import { Owner } from '../../domain/entities/owner.entity';
import { Address } from '../../domain/entities/address';

export class OwnerCreateRequest {
  @Length(0, 100)
  fullName: string;

  @Length(0, 50)
  street: string;

  @Length(0, 50)
  city: string;

  @Length(0, 50)
  country: string;

  @Length(0, 10)
  zipCode: string;

  toEntity(owner: Owner): Owner {
    owner.fullName = this.fullName;
    owner.address = new Address();
    owner.address.street = this.street;
    owner.address.city = this.city;
    owner.address.country = this.country;
    owner.address.zipCode = this.zipCode;
    return owner;
  }
}