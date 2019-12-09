import { ApiModelProperty } from '@nestjs/swagger';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { OrderItem } from '../order-item.entity';

export class OrderItemDto {
  @ApiModelProperty({ example: 1 })
  id: number;

  @ApiModelProperty({ example: 1 })
  productId: number;

  @ApiModelProperty({ example: 10 })
  quantity: number;

  @ApiModelProperty({ example: 20 })
  unitPrice: number;

  @ApiModelProperty({ example: 200 })
  totalPrice: number;

  @ApiModelProperty({ type: CreateProductDto })
  customer: CreateProductDto;

  constructor(orderItem: OrderItem) {
    Object.assign(this, orderItem.get({ clone: true }));
  }
}
