import { Controller, Get, Post, Body, Param, HttpCode, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { log } from 'node:console';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Partial<Users>> {

    //En otras circunstancias mandaría un mensaje de "Usuario creado con "
    return this.userService.createUser(createUserDto);
  }

  @Get('all')
  @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<Users[]> {
    return this.userService.findAll();
  }

  @Get(':email')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('email') email: string): Promise<Users | undefined> {
    return this.userService.findOneByEmail(email);
  }
}
