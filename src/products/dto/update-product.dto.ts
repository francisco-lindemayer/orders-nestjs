import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiModelProperty({ example: 1 })
  id: number;

  @ApiModelProperty({ example: 'Café' })
  name: string;

  @ApiModelProperty({ example: '01010101010101010101' })
  barcode: string;

  @ApiModelProperty({ example: 9.95 })
  unitPrice: number;
}
