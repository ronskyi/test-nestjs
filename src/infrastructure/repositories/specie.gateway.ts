import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from '../../domain/repositories/pagination';
import { Repository } from 'typeorm';
import { ISpecieRepository } from '../../domain/repositories/specie.repository.interface';
import { Specie } from '../../domain/entities/specie.entity';
import { SpecieSearchQuery } from '../../domain/queries/specie-search.query';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

@Injectable()
export class SpecieGateway implements ISpecieRepository {
  constructor(
    @InjectRepository(Specie)
    private readonly repository: Repository<Specie>,
  ) {}

  saveEntity(entity: Specie): Promise<Specie> {
    return this.repository.save(entity);
  }

  findOneById(id: string): Promise<Specie | undefined> {
    return this.repository.findOne({ id });
  }

  findBySearchQuery(
    query: SpecieSearchQuery,
    pagination: Pagination,
  ): Promise<Specie[]> {
    const qb = this.repository.createQueryBuilder('s');
    qb.limit(pagination.limit).skip(pagination.offset);
    SpecieGateway.addSearchWhere(qb, query);
    return qb.getMany();
  }

  countBySearchQuery(query: SpecieSearchQuery): Promise<number> {
    const qb = this.repository.createQueryBuilder('s');
    SpecieGateway.addSearchWhere(qb, query);
    return qb.getCount();
  }

  deleteEntity(entity: Specie): Promise<Specie> {
    return this.repository.remove(entity);
  }

  private static addSearchWhere(
    qb: SelectQueryBuilder<Specie>,
    query: SpecieSearchQuery,
  ): void {
    if (query.keyword) {
      qb.andWhere(`"s"."label" ILIKE '%' || :keyword || '%'`, {
        keyword: query.keyword,
      });
    }
  }
}
