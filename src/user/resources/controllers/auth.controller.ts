import {
  UseGuards,
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
} from '@nestjs/common';
import { JsonAuthGuard } from '../guards/json-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../domain/entities/user.entity';
import { TokenLoginResponse } from '../response/token-login.response';
import { ReqUser } from '../../../@resources/request/user.decorator';

@Controller()
export class AuthController {
  constructor(private jwtService: JwtService) {
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  @UseGuards(JsonAuthGuard)
  async login(
    @ReqUser() user: User,
  ): Promise<TokenLoginResponse> {
    return new TokenLoginResponse(
      await this.createAccessToken(user),
    );
  }

  private async createAccessToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };
    return this.jwtService.sign(payload);
  }
}
