import { Module } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { Locations } from './locations.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Locations])],
  controllers: [LocationsController],
  providers: [LocationsService]
})
export class LocationsModule {}
