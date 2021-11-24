import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from '../../domain/entities/owner.entity';
import { Pagination } from '../../domain/repositories/pagination';
import { Repository } from 'typeorm';
import { IOwnerRepository } from '../../domain/repositories/owner.repository.interface';
import { OwnerSearchQuery } from '../../domain/queries/owner-search.query';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

@Injectable()
export class OwnerGateway implements IOwnerRepository {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
  ) {}

  saveEntity(entity: Owner): Promise<Owner> {
    return this.ownerRepository.save(entity);
  }

  findOneById(id: string): Promise<Owner | undefined> {
    return this.ownerRepository.findOne({ id });
  }

  findBySearchQuery(
    query: OwnerSearchQuery,
    pagination: Pagination,
  ): Promise<Owner[]> {
    const qb = this.ownerRepository.createQueryBuilder('o');
    qb.limit(pagination.limit).skip(pagination.offset);
    OwnerGateway.addSearchWhere(qb, query);
    return qb.getMany();
  }

  countBySearchQuery(query: OwnerSearchQuery): Promise<number> {
    const qb = this.ownerRepository.createQueryBuilder('o');
    OwnerGateway.addSearchWhere(qb, query);
    return qb.getCount();
  }

  deleteEntity(owner: Owner): Promise<Owner> {
    return this.ownerRepository.remove(owner);
  }

  private static addSearchWhere(
    qb: SelectQueryBuilder<Owner>,
    query: OwnerSearchQuery,
  ): void {
    if (query.keyword) {
      qb.andWhere(`"o"."fullName" ILIKE '%' || :keyword || '%'`, {
        keyword: query.keyword,
      });
    }
  }
}
