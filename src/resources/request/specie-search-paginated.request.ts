import { IntersectionType } from '@nestjs/mapped-types';
import { PaginationRequest } from './pagination.request';
import { Pagination } from '../../domain/repositories/pagination';
import { SpecieSearchRequest } from './specie-search.request';
import { SpecieSearchQuery } from '../../domain/queries/specie-search.query';

export class SpecieSearchPaginatedRequest extends IntersectionType<
  SpecieSearchRequest,
  PaginationRequest
>(SpecieSearchRequest, PaginationRequest) {
  toQuery(query: SpecieSearchQuery): SpecieSearchQuery {
    const noPageParams = new SpecieSearchRequest();
    Object.assign(noPageParams, this);
    return noPageParams.toQuery(query);
  }

  toDomainPagination(): Pagination {
    const paginationRequest = new PaginationRequest();
    Object.assign(paginationRequest, this);
    return paginationRequest.toDomainPagination();
  }
}
