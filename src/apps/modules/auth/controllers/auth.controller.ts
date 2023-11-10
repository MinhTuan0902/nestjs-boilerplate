import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { AuthService } from '../services';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // http://localhost:3000/auth/verify_email?token=...
  @Get('verify_email')
  async verifyEmail(@Req() request: Request, @Res() response: Response) {
    return this.authService.verifyEmail(request, response);
  }
}
