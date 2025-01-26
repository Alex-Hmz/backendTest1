import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Orders } from './orders.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: Partial<Orders>): Promise<Orders> {
    return this.ordersService.createOrder(createOrderDto);
  }

    @Get('/all')
    @UseGuards(AuthGuard('jwt'))

    async getAllOrders(): Promise<Orders[]> {
        return this.ordersService.getAllOrders();
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async getOrderById(@Param('id') id: string): Promise<Orders> {
        return this.ordersService.getOrderById(id);
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    async updateOrder(
        @Param('id') id: string,
        @Body() updateData: Partial<Orders>,
    ): Promise<Orders> {
        return this.ordersService.updateOrder(id, updateData);
    }

    @Patch('/status/:id')
    @UseGuards(AuthGuard('jwt'))
    async updateOrderStatus(
        @Param('id') id: string,
        @Body('status') status: string,
    ): Promise<Orders> {
        return this.ordersService.updateOrderStatus(id, status);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async deleteOrder(@Param('id') id: string): Promise<Orders> {
        return this.ordersService.deleteOrder(id);
    }
}
