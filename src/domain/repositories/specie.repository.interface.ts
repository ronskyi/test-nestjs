import { Pagination } from './pagination';
import { Specie } from '../entities/specie.entity';
import { SpecieSearchQuery } from '../queries/specie-search.query';

export abstract class ISpecieRepository {
  abstract saveEntity(entity: Specie): Promise<Specie>;
  abstract findOneById(id: string): Promise<Specie | undefined>;
  abstract findBySearchQuery(
    query: SpecieSearchQuery,
    pagination: Pagination,
  ): Promise<Specie[]>;
  abstract countBySearchQuery(query: SpecieSearchQuery): Promise<number>;
  abstract deleteEntity(entity: Specie): Promise<Specie>;
}
