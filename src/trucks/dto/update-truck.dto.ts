import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength, Length, IsNumber, Min, Max } from 'class-validator';
import { ObjectId } from 'mongodb';

export class UpdateTruckDto {
  
    @IsNotEmpty({ message: 'Error al leer el objeto' })
    _id: ObjectId;

  @IsNotEmpty({ message: 'Error al leer el objeto' })
  user: ObjectId;

  @IsString()
  @MinLength(3)
  @MaxLength(4)
  @IsNotEmpty({ message: 'El año es obligatorio.' })
  year:string;

  @MinLength(1)
  @MaxLength(15)
  @IsString()
  @IsNotEmpty({ message: 'El color es obligatorio' })
  color: string;
  

  @Length(9)
  @IsString()
  @IsNotEmpty({ message: 'Las placas son obligatorias' })
  plates: string;

}