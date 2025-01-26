import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Orders } from './orders.entity';

@Controller('api/v1/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: Partial<Orders>): Promise<Orders> {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get('/all')
  async getAllOrders(): Promise<Orders[]> {
    return this.ordersService.getAllOrders();
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<Orders> {
    return this.ordersService.getOrderById(id);
  }

  @Patch(':id')
  async updateOrder(
    @Param('id') id: string,
    @Body() updateData: Partial<Orders>,
  ): Promise<Orders> {
    return this.ordersService.updateOrder(id, updateData);
  }

  @Patch('/status/:id')
  async updateOrderStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<Orders> {
    return this.ordersService.updateOrderStatus(id, status);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string): Promise<Orders> {
    return this.ordersService.deleteOrder(id);
  }
}
