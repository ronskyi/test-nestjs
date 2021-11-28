import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { repositoryProviders } from './infrastructure/repositories';
import { User } from './domain/entities/user.entity';
import { UserService } from './domain/services/user.service';
import { AuthController } from './resources/controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtFactory } from './factories/jwt.factory';

const domainServices = [UserService];

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: JwtFactory,
    }),
  ],
  providers: [...repositoryProviders, ...domainServices],
})
export class UserModule {
}
