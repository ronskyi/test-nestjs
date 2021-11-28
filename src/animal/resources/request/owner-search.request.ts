import { IsOptional, MaxLength } from 'class-validator';
import { OwnerSearchQuery } from '../../domain/queries/owner-search.query';

export class OwnerSearchRequest {
  @IsOptional()
  @MaxLength(20)
  keyword: string;

  toQuery(query: OwnerSearchQuery): OwnerSearchQuery {
    query.keyword = this.keyword;
    return query;
  }
}
