import { IsUUID } from 'class-validator';

export class IdRequest {
  @IsUUID()
  id: string;
}
