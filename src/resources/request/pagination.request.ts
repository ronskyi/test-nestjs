import { IsNumber, IsPositive, Max } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { Pagination } from '../../domain/repositories/pagination';

export class PaginationRequest {
  @Expose({name: 'page'})
  @Transform((p) => (p.value !== undefined ? Number(p.value) : undefined))
  @IsNumber()
  @IsPositive()
  pageNumber: number;

  @Expose({name: 'page_size'})
  @Transform((p) => (p.value !== undefined ? Number(p.value) : undefined))
  @IsNumber()
  @IsPositive()
  @Max(20)
  pageSize: number;

  toDomainPagination(): Pagination {
    const pagination = new Pagination();
    pagination.limit = this.pageSize;
    pagination.offset = (this.pageNumber - 1) * this.pageSize;
    return pagination;
  }
}