import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiModelProperty({ example: 1 })
  id: number;

  @ApiModelProperty({ enum: ['paid', 'canceled'] })
  status: 'paid' | 'canceled';
}
