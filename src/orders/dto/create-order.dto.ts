import { ApiModelProperty } from '@nestjs/swagger';
import { CreateOrderItemDto } from './create-order-item.dto';
import { Product } from 'src/products/product.entity';
import { plainToClass } from 'class-transformer';

export class CreateOrderDto {
  @ApiModelProperty({ example: 1 })
  customerId: number;

  @ApiModelProperty({ type: CreateOrderItemDto, isArray: true })
  orderItens: CreateOrderItemDto[];

  totalPrice: number = 0;

  calculateOrderItens(products: Product[]) {
    this.orderItens = plainToClass(CreateOrderItemDto, this.orderItens);
    this.orderItens.forEach(orderItem => {
      const product = products.find(
        product => product.id === orderItem.productId,
      );
      orderItem.totalize(product.unitPrice);
      this.totalPrice += orderItem.totalPrice;
    });
  }
}
