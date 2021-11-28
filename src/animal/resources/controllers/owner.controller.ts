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
import { OwnerService } from '../../domain/services/owner.service';
import { Owner } from '../../domain/entities/owner.entity';
import { OwnerDataRequest } from '../request/owner-data.request';
import { CollectionResponse } from '../response/collection.response';
import { BadRequestExceptionFactory } from '../../../@factories/bad-request-exception.factory';
import { IdRequest } from '../request/id.request';
import { OwnerSearchPaginatedRequest } from '../request/owner-search-paginated.request';
import { OwnerSearchQuery } from '../../domain/queries/owner-search.query';

@Controller('/owners')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

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
    @Query() request: OwnerSearchPaginatedRequest,
  ): Promise<CollectionResponse<Owner>> {
    const query = new OwnerSearchQuery();
    const [items, total] = await Promise.all([
      this.ownerService.getAll(
        request.toQuery(query),
        request.toDomainPagination(),
      ),
      this.ownerService.countAll(request.toQuery(query)),
    ]);
    return new CollectionResponse<Owner>(items, total);
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
  create(@Body() data: OwnerDataRequest): Promise<Owner> {
    const owner = data.toEntity(new Owner());
    return this.ownerService.create(owner);
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
    @Body() data: OwnerDataRequest,
  ): Promise<Owner> {
    const dbOwner = await this.ownerService.getById(params.id);
    const upOwner = new Owner();
    upOwner.id = dbOwner.id;
    return this.ownerService.update(data.toEntity(upOwner));
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
  async getById(@Param() params: IdRequest): Promise<Owner> {
    return this.ownerService.getById(params.id);
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
    const owner = await this.ownerService.getById(params.id);
    return this.ownerService.deleteOwner(owner);
  }
}
