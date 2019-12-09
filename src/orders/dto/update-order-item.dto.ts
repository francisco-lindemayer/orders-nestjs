import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateOrderItemDto {
  @ApiModelProperty({ example: 1 })
  id: number;

  @ApiModelProperty({ example: 5 })
  quantity: number;
}
