import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('api/v1/authentication')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Post('login')
    async login(@Body() authLoginDto: AuthLoginDto):Promise<{access_token: string}> {

      return this.authenticationService.login(authLoginDto);
    }
}
