import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';
import { ObjectId } from 'typeorm';

export class UpdateUserDto {


  @IsString()
  @IsNotEmpty({ message: 'Hubo un error al leer el objeto' })
  id: string;

  @IsString()
  @MaxLength(10)
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
  username: string;

  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;

  @MinLength(6)
  @MaxLength(10)
  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;
}