import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { Locations } from './locations.entity';

@Controller('api/v1/locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  async createLocation(@Body('place_id') place_id: string) {
    return this.locationsService.createLocation(place_id);
  }

  @Get('all')
  async getAllLocations() {
    return this.locationsService.getAllLocations();
  }

  @Patch(':id')
  async updateLocation(
    @Param('id') id: string,
    @Body() updateData: Partial<Locations>,
  ) {
    return this.locationsService.updateLocation(id, updateData);
  }

  @Delete(':id')
  async deleteLocation(@Param('id') id: string) {
    return this.locationsService.deleteLocation(id);
  }
}
