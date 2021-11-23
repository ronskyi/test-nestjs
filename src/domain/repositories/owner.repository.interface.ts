import { Owner } from '../entities/owner.entity';
import { Pagination } from './pagination';

export abstract class IOwnerRepository {
  abstract saveEntity(entity: Owner): Promise<Owner>;
  abstract findOneById(id: string): Promise<Owner | undefined>;
  abstract findAll(pagination: Pagination): Promise<Owner[]>;
  abstract countAll(): Promise<number>;
  abstract deleteEntity(entity: Owner): Promise<Owner>;
}