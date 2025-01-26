import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async createUser(data: CreateUserDto): Promise<Partial<Users>> {

    try {

      const {email, password} = data;

        const exits_user = await this.usersRepository.findOne({
          where: { email },
        });
  
        if (exits_user) {
          throw new HttpException(
            '¡Usuario registrado!', 
            HttpStatus.CONFLICT
          );
        }

        const rounds = 10;
        const hashed_password = await bcrypt.hash(password, rounds)
        data.password = hashed_password;
        const id = uuidv4();



        const user = this.usersRepository.create({id, ...data});

        const {password:password_encripted, _id, ...response }= await this.usersRepository.save(user);

        return response;

      

      } catch (error) {

        if (error instanceof HttpException) {
          throw error;
        }

        throw new HttpException(
          'Error interno del servidor', 
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
  }


  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async findOneByEmail(email: string): Promise<Users | undefined> {
    try{
      
      const exits_user = await this.usersRepository.findOne({
        where: { email },
      });

      // if (!exits_user) {
      //   throw new HttpException(
      //     '¡Usuario no encontrado!', 
      //     HttpStatus.NOT_FOUND
      //   );
      // }
      
      return exits_user;

    }catch(error){
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Error interno del servidor', 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    
  }
  async findOneById(id: string): Promise<Users | undefined> {
    try{
      
      const exits_user = await this.usersRepository.findOne({
        where: { id },
      });
      
      return exits_user;

    }catch(error){
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Error interno del servidor', 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    
  }

  async checkPassword(password:string, hashed_password:string): Promise<Boolean>{
    return bcrypt.compare(password, hashed_password);
  }

  async updateUser(updateUserDto:UpdateUserDto): Promise<Partial<Users>>{

    try{

        const {id, password} = updateUserDto
        
        

        const user = await this.usersRepository.findOneBy({
          id ,
        });
  
      if (!user) {
        throw new HttpException(
          '¡Usuario no encontrado!', 
          HttpStatus.NOT_FOUND
        );
      }

      const rounds = 10;
      const hashed_password = await bcrypt.hash(password, rounds)
      updateUserDto.password = hashed_password;


      Object.assign(user, updateUserDto);

      const {password:password_encripted, ...response }= await this.usersRepository.save(user);
      return response;

    }catch(error){
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Error interno del servidor', 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

 
  }

  async deleteUser(id: string): Promise<Users | undefined> {
    try{
      
      const exits_user = await this.usersRepository.findOne({
        where: { id },
      });
      
      if (!exits_user) {
        throw new HttpException(
          '¡Usuario no encontrado!', 
          HttpStatus.NOT_FOUND
        );
      }

      const delete_user = await this.usersRepository.delete(id);
      return exits_user;

    }catch(error){
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Error interno del servidor', 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    
  }
}
