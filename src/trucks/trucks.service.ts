import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trucks } from './trucks.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { log } from 'console';

@Injectable()
export class TrucksService {
    constructor(
        @InjectRepository(Trucks)
        private readonly trucksRepository: Repository<Trucks>,
    ) {}

    async create(data: Partial<Trucks>): Promise<Trucks> {
    // Convertir el userId a ObjectId
    const user = new ObjectId(data.user);

    // Crear el truck
    const truck = this.trucksRepository.create({
        ...data,
        user
    });

    return await this.trucksRepository.save(truck);
    }

    async findAll(): Promise<Trucks[]> {
        return this.trucksRepository.find();
    }

    async getOneById(_id: string): Promise<Trucks> {
        try {
          const truck = await this.trucksRepository.findOne({
            where: { _id: new ObjectId(_id) }, // Convertir el ID a ObjectId
          });
      
          if (!truck) {
            throw new HttpException('¡Camión no encontrado!', HttpStatus.NOT_FOUND);
          }
      
          return truck;
        } catch (error) {
          throw new HttpException(
            'Error al obtener el camión',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
      

    async update(updateTruckDto:UpdateTruckDto): Promise<Partial<Trucks>>{

    try{

        const {_id} = updateTruckDto;
        

        const truck = await this.trucksRepository.findOneBy({
            _id: new ObjectId(_id) ,
        });
    
        if (!truck) {
        throw new HttpException(
            '¡Camión no encontrado!', 
            HttpStatus.NOT_FOUND
        );
        }


        Object.assign(truck, updateTruckDto);
        truck._id = new ObjectId(_id);

        const response= await this.trucksRepository.update(new ObjectId(_id), truck);
        const updated_truck = await this.trucksRepository.findOneBy({
            _id: new ObjectId(_id),
          });

        return updated_truck;



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
    async delete(_id: string): Promise<Trucks | undefined> {
        try {

            
          const truck = await this.trucksRepository.findOne({
            where: { _id: new ObjectId(_id) },
          });
      
          if (!truck) {
            throw new HttpException('¡Camión no encontrado!', HttpStatus.NOT_FOUND);
          }
      
          await this.trucksRepository.remove(truck);
      
          return truck; 
        } catch (error) {
          if (error instanceof HttpException) {
            throw error;
          }
      
          throw new HttpException(
            'Error interno del servidor',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
    }

}
