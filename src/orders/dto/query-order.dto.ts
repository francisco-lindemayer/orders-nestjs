import { ApiModelProperty } from '@nestjs/swagger';
import { QueryPageDto } from 'src/commons/query-page.dto';

export class QueryOrderDto extends QueryPageDto {
  @ApiModelProperty({ example: 1, required: false })
  customerId: number;

  @ApiModelProperty({ example: 115.2, required: false })
  totalPrice: number;

  @ApiModelProperty({ enum: ['pending', 'paid', 'canceled'], required: false })
  status: 'pending' | 'paid' | 'canceled';

  @ApiModelProperty({ example: '2019-12-09T01:15:54.864Z', required: false })
  createdAt: Date;
}
