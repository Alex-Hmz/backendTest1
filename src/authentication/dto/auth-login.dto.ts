import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';

export class AuthLoginDto {
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(10)
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;
}