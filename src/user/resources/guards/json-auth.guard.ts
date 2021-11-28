import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JsonAuthGuard extends AuthGuard('json') {}
