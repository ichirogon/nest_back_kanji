import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  signUp(@Body(ValidationPipe) userData: AuthCredentialsDto): Promise<void> {
    return this.authService.singUp(userData);
  }

  @Post('/signIn')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{
    accessToken: string;
  }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
