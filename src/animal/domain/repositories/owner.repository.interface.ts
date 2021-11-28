import { Owner } from '../entities/owner.entity';
import { Pagination } from './pagination';
import { OwnerSearchQuery } from '../queries/owner-search.query';

export abstract class IOwnerRepository {
  abstract saveEntity(entity: Owner): Promise<Owner>;
  abstract findOneById(id: string): Promise<Owner | undefined>;
  abstract findBySearchQuery(
    query: OwnerSearchQuery,
    pagination: Pagination,
  ): Promise<Owner[]>;
  abstract countBySearchQuery(query: OwnerSearchQuery): Promise<number>;
  abstract deleteEntity(entity: Owner): Promise<Owner>;
}
