import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CollectionResponse } from '../response/collection.response';
import { BadRequestExceptionFactory } from '../../../@factories/bad-request-exception.factory';
import { IdRequest } from '../request/id.request';
import { SpecieService } from '../../domain/services/specie.service';
import { Specie } from '../../domain/entities/specie.entity';
import { SpecieDataRequest } from '../request/specie-data.request';
import { SpecieSearchPaginatedRequest } from '../request/specie-search-paginated.request';
import { SpecieSearchQuery } from '../../domain/queries/specie-search.query';

@Controller('/species')
export class SpecieController {
  constructor(private readonly specieService: SpecieService) {}

  @Get()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: BadRequestExceptionFactory,
    }),
  )
  async find(
    @Query() request: SpecieSearchPaginatedRequest,
  ): Promise<CollectionResponse<Specie>> {
    const query = new SpecieSearchQuery();
    const [items, total] = await Promise.all([
      this.specieService.getAll(
        request.toQuery(query),
        request.toDomainPagination(),
      ),
      this.specieService.countAll(request.toQuery(query)),
    ]);
    return new CollectionResponse<Specie>(items, total);
  }

  @Post()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: BadRequestExceptionFactory,
    }),
  )
  create(@Body() data: SpecieDataRequest): Promise<Specie> {
    const owner = data.toEntity(new Specie());
    return this.specieService.create(owner);
  }

  @Put(':id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: BadRequestExceptionFactory,
    }),
  )
  async update(
    @Param() params: IdRequest,
    @Body() data: SpecieDataRequest,
  ): Promise<Specie> {
    const dbEntity = await this.specieService.getById(params.id);
    const upEntity = new Specie();
    upEntity.id = dbEntity.id;
    return this.specieService.update(data.toEntity(upEntity));
  }

  @Get(':id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: BadRequestExceptionFactory,
    }),
  )
  async getById(@Param() params: IdRequest): Promise<Specie> {
    return this.specieService.getById(params.id);
  }

  @Delete(':id')
  @HttpCode(204)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: BadRequestExceptionFactory,
    }),
  )
  async delete(@Param() params: IdRequest): Promise<void> {
    const entity = await this.specieService.getById(params.id);
    return this.specieService.deleteOwner(entity);
  }
}
