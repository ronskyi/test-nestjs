import { Length } from 'class-validator';

export class AddressCreateRequest {
  @Length(0, 50)
  street: string;

  @Length(0, 50)
  city: string;

  @Length(0, 50)
  country: string;

  @Length(0, 10)
  zipCode: string;
}