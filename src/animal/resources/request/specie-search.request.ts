import { IsOptional, MaxLength } from 'class-validator';
import { SpecieSearchQuery } from '../../domain/queries/specie-search.query';

export class SpecieSearchRequest {
  @IsOptional()
  @MaxLength(20)
  keyword: string;

  toQuery(query: SpecieSearchQuery): SpecieSearchQuery {
    query.keyword = this.keyword;
    return query;
  }
}
