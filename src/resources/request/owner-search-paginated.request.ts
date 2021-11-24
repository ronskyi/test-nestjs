import { IntersectionType } from '@nestjs/mapped-types';
import { PaginationRequest } from './pagination.request';
import { OwnerSearchRequest } from './owner-search.request';
import { OwnerSearchQuery } from '../../domain/queries/owner-search.query';
import { Pagination } from '../../domain/repositories/pagination';

export class OwnerSearchPaginatedRequest extends IntersectionType<
  OwnerSearchRequest,
  PaginationRequest
>(OwnerSearchRequest, PaginationRequest) {
  toQuery(query: OwnerSearchQuery): OwnerSearchQuery {
    const noPageParams = new OwnerSearchRequest();
    Object.assign(noPageParams, this);
    return noPageParams.toQuery(query);
  }

  toDomainPagination(): Pagination {
    const paginationRequest = new PaginationRequest();
    Object.assign(paginationRequest, this);
    return paginationRequest.toDomainPagination();
  }
}
