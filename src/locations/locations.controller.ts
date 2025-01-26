import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { Locations } from './locations.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/locations')
export class LocationsController {
    constructor(private readonly locationsService: LocationsService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createLocation(@Body('place_id') place_id: string) {
        return this.locationsService.createLocation(place_id);
    }

    @Get('all')
    @UseGuards(AuthGuard('jwt'))
    async getAllLocations() {
        return this.locationsService.getAllLocations();
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    async updateLocation(
        @Param('id') id: string,
        @Body() updateData: Partial<Locations>,
    ) {
        return this.locationsService.updateLocation(id, updateData);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async deleteLocation(@Param('id') id: string) {
        return this.locationsService.deleteLocation(id);
    }
}
