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
import { AnimalService } from '../../domain/services/animal.service';
import { Animal } from '../../domain/entities/animal.entity';
import { AnimalDataRequest } from '../request/animal-data.request';
import { AnimalDataTransformer } from '../transformers/animal-data.transformer';
import { AnimalResponse } from '../response/animal.response';
import { PaginationRequest } from '../request/pagination.request';

@Controller('/animals')
export class AnimalController {
  constructor(
    private readonly animalService: AnimalService,
    private readonly transformer: AnimalDataTransformer,
  ) {}

  @Get()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: BadRequestExceptionFactory,
    }),
  )
  async getAll(
    @Query() request: PaginationRequest,
  ): Promise<CollectionResponse<AnimalResponse>> {
    const [items, total] = await Promise.all([
      this.animalService.getAll(request.toDomainPagination()),
      this.animalService.countAll(),
    ]);
    return new CollectionResponse<AnimalResponse>(
      items.map(this.transformer.toResponse),
      total,
    );
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
  async create(@Body() data: AnimalDataRequest): Promise<Animal> {
    const entity = await this.transformer.toEntity(
      data.createNewRequestedAnimal(),
      data,
    );
    return this.transformer.toResponse(await this.animalService.create(entity));
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
    @Body() data: AnimalDataRequest,
  ): Promise<Animal> {
    const dbEntity = await this.animalService.getById(params.id);
    const upEntity = data.createNewRequestedAnimal();
    upEntity.id = dbEntity.id;
    const updated = await this.animalService.update(
      await this.transformer.toEntity(upEntity, data),
    );
    return this.transformer.toResponse(updated);
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
  async getById(@Param() params: IdRequest): Promise<Animal> {
    return this.transformer.toResponse(
      await this.animalService.getById(params.id),
    );
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
    const entity = await this.animalService.getById(params.id);
    return this.animalService.deleteOwner(entity);
  }
}
