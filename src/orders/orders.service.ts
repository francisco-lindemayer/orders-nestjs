import {
  Injectable,
  Inject,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Order } from './order.entity';
import { QueryOrderDto } from './dto/query-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItem } from './order-item.entity';
import { Customer } from 'src/customers/customer.entity';
import { Product } from 'src/products/product.entity';

@Injectable()
export class OrdersService {
  async getAllOrders(query: QueryOrderDto): Promise<Order[]> {
    const { limit, offset, order, orderby } = query;
    const columnOrderBy = orderby ? orderby : 'id';

    return await Order.findAll<Order>({
      where: query.getFieldsToLike(),
      limit,
      offset,
      order: [[columnOrderBy, order]],
      include: [OrderItem],
    });
  }

  async createOrder(orderDto: CreateOrderDto): Promise<Order> {
    const order = new Order(orderDto);

    const products = await this.findProductsByIds(
      orderDto.orderItens.map(orderItem => orderItem.productId),
    );

    orderDto.calculateOrderItens(products);
    const createdOrder = await Order.create(orderDto, {
      include: [Customer, OrderItem],
    });

    //const createdOrder = await order.save();
    //await OrderItem.create(orderDto.orderItens);

    return await this.findOrderById(createdOrder.id);
  }

  async updateOrder(body: UpdateOrderDto): Promise<Order> {
    const order = await this.findOrderById(body.id);

    order.status = body.status;

    await order.save();

    return await this.findOrderById(order.id);
  }

  async deleteOrder(id: number): Promise<Order> {
    const order = await this.findOrderById(id);

    await OrderItem.destroy({ where: { orderId: id } });
    await order.destroy();

    return order;
  }

  async findOrderById(id: number): Promise<Order> {
    const order = await Order.findOne({
      where: {
        id,
      },
      include: [Customer, OrderItem],
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado!');
    }
    return order;
  }

  async findProductsByIds(ids: number[]) {
    const products = await Product.findAll({
      where: {
        id: ids,
      },
    });

    return products;
  }
}
