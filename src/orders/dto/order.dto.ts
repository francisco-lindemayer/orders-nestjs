import { ApiModelProperty } from '@nestjs/swagger';
import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';
import { Order } from '../order.entity';
import { OrderItemDto } from './order-item.dto';

export class OrderDto {
  @ApiModelProperty({ example: 1 })
  id: number;

  @ApiModelProperty({ example: 1 })
  customerId: number;

  @ApiModelProperty({ example: 115.2 })
  totalPrice: number;

  @ApiModelProperty({ enum: ['pending', 'paid', 'canceled'] })
  status: 'pending' | 'paid' | 'canceled';

  @ApiModelProperty({ type: CreateCustomerDto })
  customer: CreateCustomerDto;

  @ApiModelProperty({ type: OrderItemDto, isArray: true })
  orderItens: OrderItemDto[];

  constructor(order: Order) {
    Object.assign(this, order.get({ clone: true }));
    this.orderItens = order.orderItens.map(
      orderItem => new OrderItemDto(orderItem),
    );
  }
}
