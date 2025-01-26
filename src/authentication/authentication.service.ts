import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async login(authLoginDto:AuthLoginDto): Promise<{access_token: string}> {

        const {email, password} = authLoginDto;
        
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
          throw new UnauthorizedException('Credenciales inválidas');
        }
    
        const is_valid = await this.usersService.checkPassword(
          password,
          user.password,
        );

        if (!is_valid) {
          throw new UnauthorizedException('Credenciales inválidas');
        }
    
        const { password: password_encripted, _id, ...payload } = user;

        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
    
    
}
