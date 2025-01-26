import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TrucksService } from './trucks.service';
import { CreateTruckDto } from './dto/create-truck.dto';
import { AuthGuard } from '@nestjs/passport';
import { Trucks } from './trucks.entity';
import { UpdateTruckDto } from './dto/update-truck.dto';

@Controller('api/v1/trucks')
export class TrucksController {

    constructor(private readonly trucksService: TrucksService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() createTruckDto: CreateTruckDto) {
      return this.trucksService.create(createTruckDto);
    }
    
    @Get('all')
    @UseGuards(AuthGuard('jwt'))
    async findAll(): Promise<Trucks[]> {
        return this.trucksService.findAll();
    }
    @Get(':id')
    async getTruckById(@Param('id') id: string): Promise<Trucks> {
      return this.trucksService.getOneById(id);
    }

    @Patch()
    @UseGuards(AuthGuard('jwt'))
    async update(@Body() updateTruckDto: UpdateTruckDto): Promise<Partial<Trucks>>{
    return this.trucksService.update(updateTruckDto);
    }
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Trucks | undefined> {
      return this.trucksService.delete(id);
    }
    
}
