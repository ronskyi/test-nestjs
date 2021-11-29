import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const JwtFactory: (configService: ConfigService) => JwtModuleOptions =
  function (configService) {
    return {
      signOptions: {
        expiresIn: configService.get<string>('JWT_EXPIRATION') + 's',
      },
      secret: configService.get<string>('JWT_SHARED_KEY'),
    };
  };
