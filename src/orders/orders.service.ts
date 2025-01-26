import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Orders } from './orders.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
  ) {}

  async createOrder(data: Partial<Orders>): Promise<Orders> {
    try {
      const new_order = this.ordersRepository.create(data);
      return await this.ordersRepository.save(new_order);
    } catch (error) {
      throw new HttpException(
        'Error al crear la orden',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllOrders(): Promise<Orders[]> {
    return await this.ordersRepository.find();
  }

  async getOrderById(_id: string): Promise<Orders> {
    const order = await this.ordersRepository.findOne({
      where: { _id: new ObjectId(_id) },
    });

    if (!order) {
      throw new HttpException('Orden no encontrada', HttpStatus.NOT_FOUND);
    }

    return order;
  }

  async updateOrder(_id: string, update: Partial<Orders>): Promise<Orders> {
    const order = await this.ordersRepository.findOne({
      where: { _id: new ObjectId(_id) },
    });

    if (!order) {
      throw new HttpException('Orden no encontrada', HttpStatus.NOT_FOUND);
    }

    Object.assign(order, update);


    const response = await this.ordersRepository.update(new ObjectId(_id), order);

    return await this.ordersRepository.findOneBy({
        _id: new ObjectId(_id),
      });

  }

  async deleteOrder(_id: string): Promise<Orders> {
    const order = await this.ordersRepository.findOne({
      where: { _id: new ObjectId(_id) },
    });

    if (!order) {
      throw new HttpException('Orden no encontrada', HttpStatus.NOT_FOUND);
    }

    await this.ordersRepository.remove(order);
    return order;
  }

  async updateOrderStatus(_id: string, status: string): Promise<Orders> {
    const valid_statuses = ['created', 'in transit', 'completed'];

    if (!valid_statuses.includes(status)) {
      throw new HttpException(
        'Estado no válido para la orden',
        HttpStatus.BAD_REQUEST,
      );
    }

    const order = await this.ordersRepository.findOne({
      where: { _id: new ObjectId(_id) },
    });

    if (!order) {
      throw new HttpException('Orden no encontrada', HttpStatus.NOT_FOUND);
    }

    order.status = status;

    const response = await this.ordersRepository.update(new ObjectId(_id), order);

    return await this.ordersRepository.findOneBy({
        _id: new ObjectId(_id),
      });

  }
}
