import { ApiModelProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiModelProperty({ example: 1 })
  productId: number;

  @ApiModelProperty({ example: 10 })
  quantity: number;

  unitPrice: number;

  totalPrice: number;

  orderId: number;

  totalize(unitPrice: number, quantity?: number) {
    if (quantity) {
      this.quantity = quantity;
    }
    this.unitPrice = Number(unitPrice);

    this.totalPrice = this.quantity * this.unitPrice;
  }
}
