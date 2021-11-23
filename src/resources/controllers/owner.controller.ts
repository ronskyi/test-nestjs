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
  Res,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { OwnerService } from '../../domain/services/owner.service';
import { Owner } from '../../domain/entities/owner.entity';
import { OwnerCreateRequest } from '../request/owner-create.request';
import { PaginationRequest } from '../request/pagination.request';
import { CollectionResponse } from '../response/collection.response';
import { BadRequestExceptionFactory } from '../../factories/bad-request-exception.factory';
import { IdRequest } from '../request/id.request';
import { Response } from 'express';

@Controller('/owners')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {
  }

  @Get()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: BadRequestExceptionFactory
    }),
  )
  async getAll(
    @Query() pagination: PaginationRequest
  ): Promise<CollectionResponse<Owner>> {
    const [items, total] = await Promise.all([
      this.ownerService.getAll(pagination.toDomainPagination()),
      this.ownerService.countAll(),
    ])
    return new CollectionResponse<Owner>(items, total);
  }

  @Post()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: BadRequestExceptionFactory
    }),
  )
  create(
    @Body() data: OwnerCreateRequest
  ): Promise<Owner> {
    const owner = data.toEntity(new Owner());
    return this.ownerService.create(owner);
  }

  @Put(':id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: BadRequestExceptionFactory
    }),
  )
  async update(
    @Param() params: IdRequest,
    @Body() data: OwnerCreateRequest
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
      exceptionFactory: BadRequestExceptionFactory
    }),
  )
  async getById(
    @Param() params: IdRequest,
  ): Promise<Owner> {
    return this.ownerService.getById(params.id)
  }

  @Delete(':id')
  @HttpCode(204)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: BadRequestExceptionFactory
    }),
  )
  async delete(
    @Param() params: IdRequest
  ): Promise<void> {
    const owner = await this.ownerService.getById(params.id);
    return this.ownerService.deleteOwner(owner);
  }
}
