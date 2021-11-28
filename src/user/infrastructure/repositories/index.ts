import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UserGateway } from './user.gateway';

export const repositoryProviders = [
  {
    provide: IUserRepository,
    useClass: UserGateway
  }
];