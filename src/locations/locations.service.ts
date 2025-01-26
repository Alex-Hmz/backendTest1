import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';
import { Locations } from './locations.entity';

@Injectable()
export class LocationsService {

    private readonly GOOGLE_MAPS_API = process.env.GOOGLE_MAPS_API;
    private readonly API_KEY = process.env.API_KEY;
  
    constructor(
        @InjectRepository(Locations)
        private readonly locationsRepository: Repository<Locations>,
      ) {}
    
      async createLocation(place_id: string): Promise<Locations> {
        try {
          const exists_location = await this.locationsRepository.findOne({
            where: { place_id },
          });
    
          if (exists_location) {
            throw new HttpException(
              'La ubicación ya existe',
              HttpStatus.CONFLICT,
            );
          }
    
          const { data } = await axios.get(this.GOOGLE_MAPS_API, {
            params: {
              place_id,
              key: this.API_KEY,
            },
          });
    
          if (data.status !== 'OK') {
            throw new HttpException(
              `Error de Google Maps: ${data.error_message || data.status}`,
              HttpStatus.BAD_REQUEST,
            );
          }
    
          const result = data.result;
          const location = result.geometry.location;
          const address = result.formatted_address;
          const new_location = this.locationsRepository.create({
            place_id,
            address,
            latitude: location.lat,
            longitude: location.lng,
          });
    
          return await this.locationsRepository.save(new_location);
          
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
    
      async getAllLocations(): Promise<Locations[]> {
        return await this.locationsRepository.find();
      }
    
      async updateLocation(_id: string, update: Partial<Locations>): Promise<Locations> {
        const location = await this.locationsRepository.findOne({
          where: { _id: new ObjectId(_id) },
        });
    
        if (!location) {
          throw new HttpException('Ubicación no encontrada', HttpStatus.NOT_FOUND);
        }
    
        Object.assign(location, update);

        const response = await this.locationsRepository.update(new ObjectId(_id), location);
    
        return await this.locationsRepository.findOneBy({
            _id: new ObjectId(_id),
          });

      }
    
      async deleteLocation(_id: string): Promise<Locations> {
        const location = await this.locationsRepository.findOne({
          where: { _id: new ObjectId(_id) },
        });
    
        if (!location) {
          throw new HttpException('Ubicación no encontrada', HttpStatus.NOT_FOUND);
        }
    
        await this.locationsRepository.remove(location);
        return location;
      }


}
