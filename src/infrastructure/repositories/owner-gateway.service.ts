import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from '../../domain/entities/owner.entity';
import { Pagination } from '../../domain/repositories/pagination';
import { Repository } from 'typeorm';
import { IOwnerRepository } from '../../domain/repositories/owner.repository.interface';

@Injectable()
export class OwnerGateway implements IOwnerRepository {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>
  ) {
  }

  saveEntity(entity: Owner): Promise<Owner> {
    return this.ownerRepository.save(entity);
  }

  findOneById(id: string): Promise<Owner | undefined> {
    return this.ownerRepository.findOne({ id });
  }

  findAll(pagination: Pagination): Promise<Owner[]> {
    return this.ownerRepository.find({
      skip: pagination.offset,
      take: pagination.limit,
    });
  }

  countAll(): Promise<number> {
    return this.ownerRepository.count();
  }

  deleteEntity(owner: Owner): Promise<Owner> {
    return this.ownerRepository.remove(owner);
  }
}