import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../domain/services/user.service';
import { Strategy } from 'passport-json';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class JsonAuthStrategy extends PassportStrategy(Strategy, 'json') {
  constructor(private userService: UserService) {
    super();
  }

  async validate(userEmail: string, password: string): Promise<User> {
    const user = await this.userService.login(userEmail, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
