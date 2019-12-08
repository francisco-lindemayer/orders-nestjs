import { ApiModelProperty } from '@nestjs/swagger';
import { Product } from '../product.entity';

export class ProductDto {
  constructor(product: Product) {
    Object.assign(this, product.get({ clone: true }));
  }

  @ApiModelProperty({ example: 1 })
  id: number;

  @ApiModelProperty({ example: 'Café' })
  name: string;

  @ApiModelProperty({ example: '01010101010101010101' })
  barcode: string;

  @ApiModelProperty({ example: 9.95 })
  unitPrice: number;
}
