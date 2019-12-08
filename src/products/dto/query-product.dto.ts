import { ApiModelProperty } from '@nestjs/swagger';
import { QueryPageDto } from 'src/commons/query-page.dto';

export class QueryProductDto extends QueryPageDto {
  @ApiModelProperty({ example: 'Café', required: false })
  name: string;

  @ApiModelProperty({ example: '01010101010101010101', required: false })
  barcode: string;

  @ApiModelProperty({ example: 9.95, required: false })
  unitPrice: number;
}
