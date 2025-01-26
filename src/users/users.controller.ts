import { Controller, Get, Post, Body, Param, HttpCode, UseGuards, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { log } from 'node:console';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Partial<Users>> {
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

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  async update(@Body() updateUserDto: UpdateUserDto): Promise<Partial<Users>>{
    return this.userService.updateUser(updateUserDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id:string): Promise<Partial<Users>>{
    return this.userService.deleteUser(id);
  }

}
