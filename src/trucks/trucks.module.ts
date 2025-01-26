import { Module } from '@nestjs/common';
import { TrucksController } from './trucks.controller';
import { TrucksService } from './trucks.service';
import { Trucks } from './trucks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Trucks])],
  controllers: [TrucksController],
  providers: [TrucksService]
})
export class TrucksModule {}
